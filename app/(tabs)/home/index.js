import { StyleSheet, Text, View, FlatList, Alert } from "react-native";
import RecipeList from "../../../components/RecipeList";
import CategoryList from "../../../components/CategoryList";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <CategoryList />
            <RecipeList apiUrl="https://www.themealdb.com/api/json/v1/1/random.php" />
            <RecipeList apiUrl="https://www.themealdb.com/api/json/v1/1/random.php" />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
})