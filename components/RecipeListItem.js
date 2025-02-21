import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useFavorites } from "../context/FavoritesContext";
import { useState } from "react";
import Spinner from "./Spinner";

export default function RecipeListItem({ item }) {
    const router = useRouter();
    const { favorites, toggleFavorite } = useFavorites();
    const [loading, setLoading] = useState(false);

    const isFavorite = favorites.some((fav) => fav.idMeal === item.idMeal);

    const fetchMealDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(item.strMeal)}`);
            const data = await response.json();

            if (data.meals && data.meals.length > 0) {
                const fullMeal = data.meals[0];

                router.push({
                    pathname: "/details",
                    params: {
                        idMeal: fullMeal.idMeal,
                        name: fullMeal.strMeal,
                        category: fullMeal.strCategory,
                        area: fullMeal.strArea,
                        instructions: fullMeal.strInstructions,
                        image: fullMeal.strMealThumb,
                        source: fullMeal.strSource || "",
                        youtube: fullMeal.strYoutube || "",
                    },
                });
            } else {
                alert("Meal details not found!");
            }
        } catch (error) {
            console.error("Error fetching meal details:", error);
            alert("Failed to fetch meal details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={fetchMealDetails} disabled={loading}>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <Image source={{ uri: item.strMealThumb }} style={styles.image} />
                    <View style={styles.textContainer}>
                        <Text style={styles.recipeName}>{item.strMeal}</Text>
                        <Text style={styles.recipeCategory}>{item.strCategory}</Text>
                    </View>
                    <TouchableOpacity onPress={() => toggleFavorite(item)}>
                        <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={22} color="#FF5E00" style={styles.heartIcon} />
                    </TouchableOpacity>
                </>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 10,
    },
    textContainer: {
        flex: 1,
        marginLeft: 12,
    },
    recipeName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    recipeCategory: {
        fontSize: 13,
        color: "#888",
        marginTop: 3,
    },
    heartIcon: {
        marginRight: 8,
    },
    loader: {
        flex: 1,
        alignSelf: "center",
    },
});
