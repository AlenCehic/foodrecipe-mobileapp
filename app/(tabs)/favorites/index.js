import { View, Text, StyleSheet, FlatList } from "react-native";
import RecipeListItem from "../../../components/RecipeListItem";
import { useFavorites } from "../../../context/FavoritesContext";

export default function HomeScreen() {
    const { favorites } = useFavorites()

    if (favorites.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.noFavoritesText}>No favorites yet!</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={favorites}
                renderItem={({ item }) => <RecipeListItem item={item} />}
                keyExtractor={(item) => item.idMeal.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    noFavoritesText: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 20,
    },
})