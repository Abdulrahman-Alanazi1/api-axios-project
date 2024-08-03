import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import IonIcons from "@expo/vector-icons/Ionicons";
import Home from "./Screens/Home";
import Details from "./Screens/Details";
import Photos from "./Screens/Photos";
import Search from "./Screens/Search";
import Users from "./Screens/Users";
import Post_item from "./Screens/Post_item";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TopTabs = createMaterialTopTabNavigator()

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{
    }}>
      <Tab.Screen
        name="HomeStack"
        component={Home}
        options={{
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <IonIcons name="home-sharp" size={27} color={color} />
          ),
          title: "Home",
        }}
      />
      <Tab.Screen
        name="Photos"
        component={Photos}
        options={{
          headerShown: true,
          tabBarIcon: ({ color }) => <IonIcons name="camera" size={27} color={color} />,
        }}
      />
      <Tab.Screen name="Search" component={TopTabNavigator} options={{
        tabBarIcon: ({color}) => <IonIcons name="search" size={27} color={color} />
        
      }}/>
    </Tab.Navigator>
  );
}
function TopTabNavigator() {
  return(
    <TopTabs.Navigator screenOptions={{
      tabBarStyle:{
        backgroundColor:'snow'
      }
    }}>
      <TopTabs.Screen name="SearchFragment" component={Search} options={{
        title:'Search'
      }}/>
      <TopTabs.Screen name="Users" component={Users}/>
      <TopTabs.Screen name="Posts_item" component={Post_item}/>
    </TopTabs.Navigator>
  )
}
function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={TabNavigator} options={{
        headerShown:false,
        animation:'slide_from_left',
        headerTransparent:false,
        headerSearchBarOptions:{
          headerIconColor:'black'
        }
      }}
      />

      <Stack.Screen name="Details" component={Details} options={{
        animation:'slide_from_right'
      }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
