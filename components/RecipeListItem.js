import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useFavorites } from "../context/FavoritesContext";

export default function RecipeListItem({ item }) {
    const router = useRouter();
    const { favorites, toggleFavorite } = useFavorites()

    const isFavorite = favorites.some((fav) => fav.idMeal === item.idMeal)

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                router.push({
                    pathname: "/details",
                    params: {
                        id: item.idMeal,    
                        name: item.strMeal,
                        category: item.strCategory,
                        area: item.strArea,
                        instructions: item.strInstructions,
                        image: item.strMealThumb,
                        source: item.strSource || "",
                        youtube: item.strYoutube || "",
                    },
                });
            }}
        >
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.recipeName}>{item.strMeal}</Text>
                <Text style={styles.recipeCategory}>{item.strCategory}</Text>
            </View>
            <TouchableOpacity onPress={() => toggleFavorite(item)}>
                <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color="red" />
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 12,
        marginVertical: 6,
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "black",
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    textContainer: {
        flex: 1,
        marginLeft: 12,
    },
    recipeName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    recipeCategory: {
        fontSize: 14,
        color: "#666",
    },
});
