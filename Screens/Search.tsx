import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
/* 
this is for trying to add a searching functionality to the list.
*/
type comments = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
export default function Search() {
  const [data, setData] = useState<comments[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Added searchQuery and setSearchQuery

  const navigation = useNavigation<any>();
  async function getData() {
    try {
      const response = await axios.get<comments[]>(
        `https://jsonplaceholder.typicode.com/posts`
      );
      setIsLoading(false);
      setData(response.data);
    } catch (err) {
      console.error("Error fetching data:", err); // More informative error message
    }
  }
  useEffect(() => {
    getData();
  }, []);

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size={"large"} color={"blue"} />
        <Text>Loading ...</Text>
      </SafeAreaView>
    );
  }
  const colors = [
    "skyblue",
    "snow",
    "pink",
    "lightblue",
    "darkblue",
    "#F5EDED",
  ];
  const textColors = ["white", "brown", "blue", "black", "white", "darkblue"];
  return (
    <View style={{}}>
      <TextInput
        placeholder="Search"
        style={{ borderBottomWidth: 1, padding: 5, margin: 10,  backgroundColor:'white', borderRadius:5 }}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => item.id.toString()}
        maxToRenderPerBatch={10}
        renderItem={({ item, index }) => {
          const backgroundColor = colors[index % colors.length];
          const textColor = textColors[index % colors.length];

          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                navigation.navigate("Details", {
                  screenType: "Search",
                  id: item.id,
                  title: item.title,
                  body: item.body,
                })
              }
            >
              <View
                key={item.id}
                style={[styles.itemsContainer, { backgroundColor }]}
              >
                <Text style={[styles.itemTexts, { color: textColor }]}>
                  {item.id}-
                </Text>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={2}
                  style={[styles.itemTexts, { color: textColor, padding: 10 }]}
                >
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemsContainer: {
    padding: 5,
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
