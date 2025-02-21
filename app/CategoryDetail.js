import { useLocalSearchParams } from "expo-router";
import { View, StyleSheet } from "react-native";
import RecipeList from "../components/RecipeList";

export default function CategoryDetail() {
    const { category } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <RecipeList
                apiUrl={`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f8f8f8",
    },
});
