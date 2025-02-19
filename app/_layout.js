import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="details" options={{ headerShown: true, title: "Recipe Details" }} />
        </Stack>
    );
}
