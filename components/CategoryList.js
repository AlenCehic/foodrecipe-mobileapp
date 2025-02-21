import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert, StyleSheet } from 'react-native';
import CategoryListItem from './CategoryListItem';
import Spinner from './Spinner';

const apiUrl = "https://www.themealdb.com/api/json/v1/1/categories.php"

export default function CategoryList() {
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await fetch(apiUrl)

                if (!response.ok) {
                    Alert.alert("Error", `The server responded with ${response.status} ${response.statusText}`)
                    return
                }

                const categoryData = await response.json()
                setCategories(categoryData.categories || [])
            } catch (error) {
                console.error(error);
                Alert.alert("An error occurred", error.message)
            } finally {
                setIsLoading(false)
            }
        };
        loadCategories()
    }, [])

    return (
        <View style={styles.container}>
            {isLoading ? (
                <Spinner />
            ) : (
                <FlatList
                    data={categories}
                    renderItem={({ item }) => <CategoryListItem item={item} />}
                    keyExtractor={(item) => item.idCategory}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
})