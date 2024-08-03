import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

type userData = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: address;
  phone: string;
  website: string;
  company: company;
};
type address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: geo;
};
type geo = {
  lat: string;
  lng: string;
};
type company = {
  name: string;
  catchPhrase: string;
  bs: string;
};
export default function Users() {
  const [users, setUsers] = useState<userData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const navigation = useNavigation<any>();

  async function getUserData() {
    try {
      const response = await axios.get<userData[]>(
        "https://jsonplaceholder.typicode.com/users"
      );
      setIsLoading(false);
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching data:", err); // More informative error message
    }
  }
  useEffect(() => {
    getUserData();
  }, []);

  const filterUserData = users.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size={"large"} color={"blue"} />
        <Text>Loading ...</Text>
      </SafeAreaView>
    );
  }
  const BoldText = ({ children }: any) => (
    <Text style={{ fontWeight: "bold" }}>{children}</Text>
  );
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search an Employee name or username"
        style={{ borderBottomWidth: 1, padding: 5, margin: 10,  backgroundColor:'white', borderRadius:5 }}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filterUserData}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=>{
              navigation.navigate("Details", {
                screenType: "Users",
                id: item.id,
                title: item.name,
                username: item.username,
                email: item.email,
                city: item.address.city

              })
            }}>
              <View key={item.id} style={styles.itemsContainer}>
                <Text
                  style={{
                    padding: 5,
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Name
                </Text>
                <View style={{ padding: 5 }}>
                  <Text>
                    <BoldText>Employee: </BoldText>
                    {item.name}
                  </Text>
                  <Text>
                    <BoldText>Username: </BoldText>
                    {item.username}
                  </Text>
                  <Text>
                    <BoldText>Number: </BoldText>
                    {item.phone}
                  </Text>
                  <Text>
                    <BoldText>Email: </BoldText>
                    {item.email}
                  </Text>
                  <Text>
                    <BoldText>Website: </BoldText>
                    {item.website}
                  </Text>
                </View>
                <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                  Address
                </Text>
                <View style={{ padding: 5 }}>
                  <Text>
                    <BoldText>Street: </BoldText>
                    {item.address.street}
                  </Text>
                  <Text>
                    <BoldText>City: </BoldText>
                    {item.address.city}
                  </Text>
                  <Text>
                    <BoldText>Suite: </BoldText>
                    {item.address.suite}
                  </Text>
                  <Text>
                    <BoldText>Zipcode: </BoldText>
                    {item.address.zipcode}
                  </Text>
                </View>
                <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                  Company
                </Text>
                <View style={{ padding: 5 }}>
                  <Text>
                    <BoldText>Name: </BoldText>
                    {item.company.name}
                  </Text>
                  <Text>
                    <BoldText>Catch Phrase: </BoldText>
                    {item.company.catchPhrase}
                  </Text>
                  <Text>
                    <BoldText>Bs: </BoldText>
                    {item.company.bs}
                  </Text>
                </View>
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
    backgroundColor: "snow",
    flexDirection: "column",
    borderRadius: 10,
    margin: 5,
    elevation: 3,
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
