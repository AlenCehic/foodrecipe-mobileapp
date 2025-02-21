import { Stack } from "expo-router";
import { FavoritesProvider } from "../context/FavoritesContext";

export default function RootLayout() {
    return (
        <FavoritesProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="home" />
                <Stack.Screen name="details" options={{ headerShown: true, title: "Recipe Details" }} />
                <Stack.Screen name="CategoryDetail" options={{ headerShown: true, title: "Category Recipes" }} />
            </Stack>
        </FavoritesProvider>
    )
}