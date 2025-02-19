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
                <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color="#FF5E00" style={styles.heartIcon} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 14,
        marginVertical: 8,
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 12,
    },
    textContainer: {
        flex: 1,
        marginLeft: 14,
    },
    recipeName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    recipeCategory: {
        fontSize: 14,
        color: "#888",
        marginTop: 4,
    },
    heartIcon: {
        marginRight: 10,
    },
});
