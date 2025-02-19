// app/category-detail.js
import { useLocalSearchParams } from "expo-router";
import { View, FlatList, Alert, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import RecipeListItem from "../components/RecipeListItem";
import Spinner from "../components/Spinner";

export default function CategoryDetail() {
    const { category } = useLocalSearchParams()
    const [recipes, setRecipes] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)

                if (!response.ok) {
                    Alert.alert("Error", `The server responded with ${response.status} ${response.statusText}`)
                    return;
                }

                const data = await response.json()
                setRecipes(data.meals || [])
            } catch (error) {
                console.error(error)
                Alert.alert("An error occurred", error.message)
            } finally {
                setIsLoading(false)
            }
        };
        fetchRecipes()
    }, [category])

    return (
        <View style={styles.container}>
            {isLoading ? (
                <Spinner />
            ) : (
                <FlatList
                    data={recipes}
                    renderItem={({ item }) => <RecipeListItem item={item} />}
                    keyExtractor={(item) => item.idMeal}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f8f8f8",
    },
})