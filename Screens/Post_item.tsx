import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  StatusBar,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

/* 
this is for trying to add a post that contains a title and a body to the list below the inputs
*/
type postIems = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
export default function Post_item() {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const [data, setData] = useState<postIems[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<any>();

  async function getData() {
    try {
      const response = await axios.get<postIems[]>(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setData(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  }
  async function setWritePost() {
    setIsPosting(true);
    await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      {
        title : postTitle,
        body: postBody
      }
    )
    .then(res =>{

      setData([res.data, ...data])
      setPostTitle('')
      setPostBody('')
      setIsPosting(false)
    })
    .catch(err =>{
      console.log(err);

    })
  }
  useEffect(() => {
    getData();
  }, []);
  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size={"large"} color={"blue"} />
        <Text>Loading ...</Text>
      </SafeAreaView>
    );
  }
  return (
    <View>
      <>
        <View
          style={{
            padding: 5,
            margin: 10,
            backgroundColor: "white",
          }}
        >
          <TextInput
            placeholder="Write a title"
            style={{
              borderBottomWidth: 1,
              padding: 5,
              margin: 10,
              backgroundColor: "white",
            }}
            value={postTitle}
            onChangeText={setPostTitle}
          />
          <TextInput
            placeholder="Write a body"
            style={{
              borderBottomWidth: 1,
              padding: 5,
              margin: 10,
              backgroundColor: "white",
            }}
            value={postBody}
            onChangeText={setPostBody}
          />
          <Button
            title={isPosting ? "Adding..." : "Add"}
            onPress={setWritePost}
            disabled={isPosting}
          />
        </View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => item.id.toString()}
          maxToRenderPerBatch={10}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>
                  navigation.navigate("Details", {
                    screenType: "Home",
                    id: item.id,
                    title: item.title,
                    body: item.body,
                  })
                }
              >
                <View key={item.id} style={[styles.itemsContainer]}>
                  <Text style={[styles.itemTexts]}>{item.id}-</Text>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={2}
                    style={[styles.itemTexts, { padding: 10 }]}
                  >
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemsContainer: {
    padding: 5,
    backgroundColor: "snow",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    margin: 5,
    elevation: 5,
  },
  itemTexts: {
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center",
    alignItems: "center",
  },
});
