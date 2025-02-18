import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={homeScreenStyle.container}>
      <Text style={homeScreenStyle.title}>Favorites</Text>
      <View style={homeScreenStyle.line} />
      <Text>This is the Favorites Screen</Text>
    </View>
  )
}

const homeScreenStyle = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    line: {
      width: '60%',
      height: 1,
      backgroundColor: 'gray',
      marginVertical: 10,
      opacity: 0.5
    }
  })