import { View, Text, StyleSheet, Image, ScrollView, Button, Linking } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function DetailsScreen() {
    const { id, name, category, area, instructions, image, source, youtube } = useLocalSearchParams();
    const router = useRouter();

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subtitle}>{category} | {area}</Text>

            <Text style={styles.sectionTitle}>Instructions</Text>
            <Text style={styles.instructions}>{instructions}</Text>

            <View style={styles.buttonContainer}>
                {source ? (
                    <Button title="View Source" onPress={() => Linking.openURL(source)} />
                ) : null}
                {youtube ? (
                    <Button title="Watch on YouTube" color="red" onPress={() => Linking.openURL(youtube)} />
                ) : null}
            </View>

            <Button title="Go Back" onPress={() => router.back()} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    image: {
        width: "100%",
        height: 250,
        borderRadius: 10,
        marginBottom: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 16,
        marginBottom: 8,
    },
    instructions: {
        fontSize: 14,
        color: "#444",
        lineHeight: 22,
    },
    buttonContainer: {
        marginVertical: 16,
        flexDirection: "row",
        justifyContent: "space-around",
    },
});
