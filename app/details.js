import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function DetailsScreen() {
    const { id, name, category, area, instructions, image, source, youtube } = useLocalSearchParams();
    const router = useRouter();

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subtitle}>{category} | {area}</Text>

            <Text style={styles.sectionTitle}>Instructions</Text>
            <Text style={styles.instructions}>{instructions}</Text>

            <View style={styles.buttonContainer}>
                {source ? (
                    <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(source)}>
                        <Ionicons name="link" size={20} color="#fff" />
                        <Text style={styles.buttonText}>View Source</Text>
                    </TouchableOpacity>
                ) : null}
                {youtube ? (
                    <TouchableOpacity style={[styles.button, styles.youtubeButton]} onPress={() => Linking.openURL(youtube)}>
                        <Ionicons name="logo-youtube" size={20} color="#fff" />
                        <Text style={styles.buttonText}>Watch on YouTube</Text>
                    </TouchableOpacity>
                ) : null}
            </View>

            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={20} color="#fff" />
                <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        paddingBottom: 20,
        alignItems: "center",
        paddingHorizontal: 16,
    },
    image: {
        width: "100%",
        height: 300,
        borderRadius: 15,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "#333",
    },
    subtitle: {
        fontSize: 16,
        textAlign: "center",
        color: "#666",
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 16,
        marginBottom: 8,
        color: "#444",
    },
    instructions: {
        fontSize: 16,
        color: "#555",
        lineHeight: 24,
        textAlign: "justify",
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FF5E00",
        padding: 12,
        borderRadius: 10,
    },
    youtubeButton: {
        backgroundColor: "#FF0000",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        marginLeft: 8,
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#333",
        padding: 12,
        borderRadius: 10,
        marginTop: 10,
        alignSelf: "center",
    },
    backButtonText: {
        color: "#fff",
        fontSize: 16,
        marginLeft: 8,
    },
});

