import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList
} from "react-native";
import RecipeList from "../../../components/RecipeList";
import CategoryList from "../../../components/CategoryList";

export default function HomeScreen() {
    const suggestedUrls = [
        "https://www.themealdb.com/api/json/v1/1/random.php",
        "https://www.themealdb.com/api/json/v1/1/random.php"
    ];

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.imageContainer}>
                    <Image style={styles.logo} source={require("../../../assets/cooker.jpg")} />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        Hey<Text style={styles.details}>!</Text>{"\n"}What are{"\n"}we cooking{"\n"}
                        today<Text style={styles.details}>?</Text>
                    </Text>
                </View>
            </View>

            <View>
                <Text style={styles.categoryTitle}>
                    Categories<Text style={styles.details}>:</Text>
                </Text>
                <View style={styles.categoryContainer}>
                    <CategoryList />
                </View>
            </View>

            <View>
                <Text style={styles.suggestedTitle}>
                    Suggested<Text style={styles.details}>:</Text>
                </Text>
                <FlatList
                    data={suggestedUrls}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <RecipeList apiUrl={item} />}
                    scrollEnabled={false}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    logo: {
        width: 240,
        height: 200,
    },
    imageContainer: {
        top: "3%",
        textAlign: "left"
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "left",
    },
    details: {
        color: "#FF5E00",
    },
    categoryTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 5,
        marginBottom: 10,
        left: 10
    },
    categoryContainer: {
        height: 130,
        backgroundColor: "white",
        marginBottom: 10
    },
    suggestedTitle: {
        fontSize: 22,
        fontWeight: "bold",
        left: 10,
    }
});
