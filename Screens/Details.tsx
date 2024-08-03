import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

type yes = {
  displayBody: "flex" | "none";
  displayUsername: "flex" | "none";
};
export default function Details() {
  const route = useRoute();
  const { screenType, id, title, body, photo, username, email, city }: any =route.params;
  
  const BoldText = ({ children }: any) => (
    <Text style={{ fontWeight: "bold" }}>{children}</Text>
  );
  const ListData = ({ displayBody, displayUsername }: yes) => {
    return (
      <View>
        <View
          style={{
            padding: 4,
            margin: 5,
            backgroundColor: "black",
            elevation: 5,
            borderRadius: 10,
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Text
            style={{
              padding: 5,
              margin: 10,
              color: "white",
              fontWeight: "bold",
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              padding: 5,
              margin: 10,
              color: "white",
              fontWeight: "bold",
            }}
          >
            {id}
          </Text>
        </View>
        <View
          style={{
            padding: 4,
            margin: 5,
            backgroundColor: "snow",
            elevation: 5,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              padding: 5,
              margin: 10,
              textAlign: "justify",
              display: `${displayBody}`,
            }}
          >
            {body}
          </Text>
          <Text
            style={{
              padding: 5,
              margin: 10,
              textAlign: "justify",
              display: `${displayUsername}`,
            }}
          >
            <BoldText>Username: </BoldText> {username}
          </Text>
          <Text
            style={{
              padding: 5,
              margin: 10,
              textAlign: "justify",
              display: `${displayUsername}`,
            }}
          >
            <BoldText>Email: </BoldText>
            {email}
          </Text>
          <Text
            style={{
              padding: 5,
              margin: 10,
              textAlign: "justify",
              display: `${displayUsername}`,
            }}
          >
            <BoldText>City: </BoldText>
            {city}
          </Text>
        </View>
      </View>
    );
  };
  const PhotosData = () => {
    return (
      <View>
        <View
          style={{
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Image
            style={{ width: "100%", height: 300, borderRadius: 5, padding: 10 }}
            source={{ uri: photo }}
          />
        </View>
        <View
          style={{
            padding: 4,
            margin: 5,
            borderRadius: 10,
          }}
        >
          <Text>{title}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {screenType === "Home" ? (
        <ListData displayBody="flex" displayUsername="none" />
      ) : screenType === "Search" ? (
        <ListData displayBody="flex" displayUsername="none" />
      ) : screenType === "Users" ? (
        <ListData displayBody="none" displayUsername="flex" />
      ) : (
        <PhotosData />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});
