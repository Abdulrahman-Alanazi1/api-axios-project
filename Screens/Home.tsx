import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import IonIcons from "@expo/vector-icons/Ionicons";

type comments = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function Home() {
  const [data, setData] = useState<comments[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<any>();

  async function getData() {
    try {
      const response = await axios.get<comments[]>(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setData(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
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
  const colors = ["gray", "snow", "pink", "lightblue", "darkblue", "#F5EDED"];
  const textColors = [
    "darkblue",
    "brown",
    "blue",
    "black",
    "white",
    "darkblue",
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        ListHeaderComponent={() => {
          return (
            <View
              style={{
                padding: 5,
                alignItems: "center",
                borderBottomWidth: 1,
                borderStyle: "dotted",
              }}
            >
              <Text style={{ fontSize: 20 }}>Items</Text>
            </View>
          );
        }}
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
                  screenType: "Home",
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
        ListFooterComponent={() => {
          return (
            <View style={{ flexDirection: "row", justifyContent:'space-around', borderTopWidth:1, padding:10, margin:10 }}>
              <IonIcons
                name="logo-github"
                size={30}
                onPress={() =>
                  Linking.openURL("https://github.com/Abdulrahman-Alanazi1")
                }
              />
              <IonIcons
                name="logo-twitter"
                size={30}
                onPress={() => Linking.openURL("https://x.com/novelist007")}
              />
              <IonIcons
                name="logo-linkedin"
                size={30}
                onPress={() =>
                  Linking.openURL(
                    "https://www.linkedin.com/in/abdulrahman1alanazi"
                  )
                }
              />
              <IonIcons
                name="logo-reddit"
                size={30}
                onPress={() =>
                  Linking.openURL("https://www.reddit.com/user/AboOd00/")
                }
              />
            </View>
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
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    margin: 5,
    elevation: 5,
  },
  itemTexts: {
    margin: 5,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center",
    alignItems: "center",
  },
});
