import { createContext, useContext, useState } from "react";

// 1. Create Context
const FavoritesContext = createContext();

// 2. Create Provider Component
export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    // Function to toggle favorites
    const toggleFavorite = (recipe) => {
        setFavorites((currentFavorites) => {
            const isFavorite = currentFavorites.some((fav) => fav.idMeal === recipe.idMeal);
            if (isFavorite) {
                return currentFavorites.filter((fav) => fav.idMeal !== recipe.idMeal);
            } else {
                return [...currentFavorites, recipe];
            }
        });
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

// 3. Custom Hook for Easy Access
export function useFavorites() {
    return useContext(FavoritesContext);
}
