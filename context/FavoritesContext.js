import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const storedFavorites = await AsyncStorage.getItem("favorites")
                if (storedFavorites) {
                    setFavorites(JSON.parse(storedFavorites))
                }
            } catch (error) {
                console.error("Error loading favorites:", error)
            }
        }

        loadFavorites()
    }, [])

    useEffect(() => {
        const saveFavorites = async () => {
            try {
                await AsyncStorage.setItem("favorites", JSON.stringify(favorites))
            } catch (error) {
                console.error("Error saving favorites:", error)
            }
        }
        saveFavorites()
    }, [favorites])

    const toggleFavorite = (recipe) => {
        setFavorites((currentFavorites) => {
            const isFavorite = currentFavorites.some((fav) => fav.idMeal === recipe.idMeal)
            const updatedFavorites = isFavorite
                ? currentFavorites.filter((fav) => fav.idMeal !== recipe.idMeal)
                : [...currentFavorites, recipe]

            return updatedFavorites
        })
    }

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}
