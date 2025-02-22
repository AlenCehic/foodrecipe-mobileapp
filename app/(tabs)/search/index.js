import {
    View,
    Text,
    StyleSheet,
    Image,
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import SearchBar from "../../../components/searchBar";
import {useState} from "react";

export default function HomeScreen() {
    const [searchPhrase, setSearchPhrase] = useState("");

    return (
            <View style={searchStyle.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={searchStyle.headerContainer}>
                    <View style={searchStyle.imageContainer}>
                        <Image style={searchStyle.logo} source={require("../../../assets/cooker.jpg")}/>
                    </View>
                    <View style={searchStyle.titleContainer}>
                        <Text style={searchStyle.title}>
                            Hi Chef<Text style={searchStyle.details}>,</Text>{"\n"}Let's find{"\n"}something{"\n"}
                            nice to cook<Text style={searchStyle.details}>!</Text>
                        </Text>
                    </View>
                </View>
                </TouchableWithoutFeedback>
                <View style={searchStyle.searchContainer}>
                    <SearchBar searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase}/>
                </View>
            </View>
    );
}

const searchStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        width: "99%",
    },
    logo: {
        width: 240,
        height: 200,
    },
    imageContainer: {
        top: "3%",
    },
    titleContainer: {
        flex: 1,
        top: "20%",
        right: 7,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "left",
    },
    details: {
        color: "#FF5E00",
    },
    searchContainer: {
        flex: 1,
    },
});
