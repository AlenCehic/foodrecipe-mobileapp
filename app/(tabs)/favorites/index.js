import { View, Text, StyleSheet, FlatList, Image, Keyboard, TouchableWithoutFeedback } from "react-native";
import RecipeListItem from "../../../components/RecipeListItem";
import { useFavorites } from "../../../context/FavoritesContext";
import SearchBar from "../../../components/searchBar";
import { useState } from "react";

export default function HomeScreen() {
    const { favorites } = useFavorites();
    const [searchPhrase, setSearchPhrase] = useState("");

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.logo} source={require("../../../assets/cooker.jpg")} />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            Wow<Text style={styles.details}>,</Text>{"\n"}I love your{"\n"}favorite{"\n"}
                            meals<Text style={styles.details}>!</Text>
                        </Text>
                    </View>
                </View>
                {favorites.length === 0 ? (
                    <Text style={styles.noFavoritesText}>No favorites yet!</Text>
                ) : (
                    <FlatList
                        data={favorites}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <RecipeListItem item={item} />
                            </View>
                        )}
                        keyExtractor={(item) => item.idMeal.toString()}
                    />
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
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
        marginRight: 10,
    },
    imageContainer: {
        top: "3%",
    },
    titleContainer: {
        flex: 1,
        top: "20%",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "left",
    },
    details: {
        color: "#FF5E00",
    },
    noFavoritesText: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 20,
    },
    itemContainer: {
        marginTop: 20,
        width: "92%",
        alignSelf: "center"
    }
});