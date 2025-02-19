import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useFavorites } from "../context/FavoritesContext";
import { useState } from "react";

export default function RecipeListItem({ item }) {
    const router = useRouter()
    const { favorites, toggleFavorite } = useFavorites()
    const [loading, setLoading] = useState(false)

    const isFavorite = favorites.some((fav) => fav.idMeal === item.idMeal)

    const fetchMealDetails = async () => {
        setLoading(true)
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(item.strMeal)}`)
            const data = await response.json()

            if (data.meals && data.meals.length > 0) {
                const fullMeal = data.meals[0]

                router.push({
                    pathname: "/details",
                    params: {
                        id: fullMeal.idMeal,
                        name: fullMeal.strMeal,
                        category: fullMeal.strCategory,
                        area: fullMeal.strArea,
                        instructions: fullMeal.strInstructions,
                        image: fullMeal.strMealThumb,
                        source: fullMeal.strSource || "",
                        youtube: fullMeal.strYoutube || "",
                    },
                })
            } else {
                alert("Meal details not found!");
            }
        } catch (error) {
            console.error("Error fetching meal details:", error);
            alert("Failed to fetch meal details.");
        } finally {
            setLoading(false)
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={fetchMealDetails} disabled={loading}>
            {loading ? (
                <ActivityIndicator size="small" color="#FF5E00" style={styles.loader} />
            ) : (
                <>
                    <Image source={{ uri: item.strMealThumb }} style={styles.image} />
                    <View style={styles.textContainer}>
                        <Text style={styles.recipeName}>{item.strMeal}</Text>
                        <Text style={styles.recipeCategory}>{item.strCategory}</Text>
                    </View>
                    <TouchableOpacity onPress={() => toggleFavorite(item)}>
                        <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color="#FF5E00" style={styles.heartIcon} />
                    </TouchableOpacity>
                </>
            )}
        </TouchableOpacity>
    )
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
    loader: {
        flex: 1,
        alignSelf: "center",
    },
})