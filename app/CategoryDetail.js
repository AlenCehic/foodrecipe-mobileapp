import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import RecipeList from "../components/RecipeList";

export default function CategoryDetail() {
    const { category } = useLocalSearchParams();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: category ? category : "Recipes",
            headerBackTitle: "Back",
        });
    }, [navigation, category]);

    return (
        <SafeAreaView style={styles.container}>
            <RecipeList apiUrl={`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
});
