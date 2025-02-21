import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

export default function CategoryListItem({ item }) {
    const router = useRouter()

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                router.push({
                    pathname: "/CategoryDetail",
                    params: {
                        category: item.strCategory,
                    },
                });
            }}
        >
            <Image source={{ uri: item.strCategoryThumb }} style={styles.image} />
            <Text style={styles.categoryName}>{item.strCategory}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginRight: 16,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    categoryName: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: "bold",
    },
})