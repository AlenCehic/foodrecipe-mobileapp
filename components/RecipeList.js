import { StyleSheet, Text, View, FlatList, Alert } from "react-native";
import { useEffect, useState } from "react";
import RecipeListItem from "./RecipeListItem";
import Spinner from "./Spinner";

export default function RecipeList({ apiUrl }) {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadRecipes = async () => {
            try {
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    Alert.alert("Error", `The server responded with ${response.status} ${response.statusText}`);
                    return;
                }

                const recipeData = await response.json();
                setRecipes(recipeData.meals || []);
            } catch (error) {
                console.error(error);
                Alert.alert("An error occurred", error.message);
            } finally {
                setIsLoading(false);
            }
        };
        loadRecipes();
    }, [apiUrl]);

    return (
        <View style={styles.container}>
            {isLoading ? (
                <Spinner />
            ) : (
                <FlatList
                    data={recipes}
                    renderItem={({ item }) => <RecipeListItem item={item} />}
                    keyExtractor={(item) => item.idMeal}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        backgroundColor: "white",
    },
    listContainer: {
        paddingBottom: 20,
        gap: 12,
    },
});
