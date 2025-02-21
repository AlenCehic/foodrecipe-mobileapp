import { View, ActivityIndicator, StyleSheet } from "react-native";

export default function Spinner() {
    return (
        <View style={spinnerStyles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    )
}

const spinnerStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})