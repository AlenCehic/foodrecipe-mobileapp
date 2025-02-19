import {View, Text, StyleSheet, Image} from "react-native";
import SearchComponent from "../../../components/searchBar";
import SearchBar from "../../../components/searchBar";
import {useState} from "react";

export default function HomeScreen() {
    const [searchPhrase, setSearchPhrase] = useState("");
  return (
      <View style={searchStyle.container}>
          <Image
            style={searchStyle.logo}
            source={require('../../../assets/cooker.jpg')}
          />
          <Text style={searchStyle.title}>What would you like to explore<Text style={searchStyle.details}>?</Text></Text>
          <SearchBar searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase}/>
      </View>
  )
}

const searchStyle = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
        top: 200,

    },
    logo: {
        width: 20,
        height: 20,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    details: {
        color: "#FF5E00"
    },
    bar: {
        width: 100,
    }
  })