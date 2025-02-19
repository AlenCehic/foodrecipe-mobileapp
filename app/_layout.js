import { Stack } from "expo-router";
import { FavoritesProvider } from "../context/FavoritesContext";

export default function RootLayout() {
    return (
        <FavoritesProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="details" options={{ headerShown: true, title: "Recipe Details" }} />
            </Stack>
        </FavoritesProvider>
    );
}
