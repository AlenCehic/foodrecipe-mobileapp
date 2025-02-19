import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

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

export function useFavorites() {
    return useContext(FavoritesContext);
}
