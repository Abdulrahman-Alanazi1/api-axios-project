import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

type photos = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export default function Photos() {
  const [photoData, setPhotoData] = useState<photos[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<any>()
  async function getPhotos() {
    try {
      const response = await axios.get<photos[]>(
        "https://jsonplaceholder.typicode.com/photos"
      );
      setPhotoData(response.data);
      setIsLoading(false)
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getPhotos();
    
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size={"large"} color={"blue"} />
        <Text>Loading ...</Text>
      </SafeAreaView>
    );
  }
  const colors = [
    "#EECEB9",
    "#987D9A",
    "pink",
    "lightblue",
    "darkblue",
    "#F5EDED",
    "#0F67B1",
  ];
  const textColors = [
    "darkblue",
    "lightgreen",
    "blue",
    "black",
    "white",
    "black",
    "#987D9A",
  ];
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={photoData}
        maxToRenderPerBatch={5}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item, index }) => {
          const backgroundColor = colors[index % colors.length];
          const textColor = textColors[index % colors.length];
          return (
            <View
              style={[styles.itemContainer, { backgroundColor }]}
              key={item.id}
            >
              <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('Details',{
                screenType: 'Photos',
                photo: item.url,
                title: item.title
              })}>
                <Image style={styles.img} source={{ uri: item.url }} />
                <Text style={[styles.titleTxt, { color: textColor }]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 5,
    padding: 5,
    borderRadius: 5,
  },
  img: {
    height: 200,
    width: "100%",
    borderRadius: 5,
  },
  titleTxt: {
    padding: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center",
    alignItems: "center",
  },
});
