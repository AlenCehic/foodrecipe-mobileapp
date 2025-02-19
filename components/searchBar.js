import React, {useState, useEffect} from "react";
import {
    StyleSheet,
    TextInput,
    View,
    Keyboard,
    FlatList,
    Text,
    Image,
    ActivityIndicator,
    TouchableWithoutFeedback,
    SafeAreaView
} from "react-native";
import {Feather, Entypo} from "@expo/vector-icons";
import RecipeListItem from "./RecipeListItem";

const SearchBar = () => {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (searchPhrase.length > 0) {
            fetchData();
        } else {
            setData([]);
        }
    }, [searchPhrase]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchPhrase}`
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            setData(result.meals || []);
        } catch (error) {
            console.error("Fehler beim Laden der Daten:", error);
            setError("Error fetching data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <View style={styles.searchBar}>
                        <Feather name="search" size={20} color="#FF5E00" style={styles.searchIcon}/>
                        <TextInput
                            style={styles.input}
                            placeholder="Your wished meal"
                            value={searchPhrase}
                            onChangeText={setSearchPhrase}
                            onFocus={() => setClicked(true)}
                            onBlur={() => setClicked(false)}
                        />
                        <Entypo
                            name="cross"
                            size={20}
                            color="#FF5E00"
                            style={[styles.crossIcon, {opacity: searchPhrase ? 1 : 0}]}
                            onPress={() => {
                                setSearchPhrase("");
                                Keyboard.dismiss();
                                setClicked(false);
                            }}
                        />
                    </View>

                    {loading && <ActivityIndicator size="large" color="#FF5E00" style={styles.loader}/>}

                    <FlatList
                        keyboardShouldPersistTaps="handled"
                        keyboardDismissMode="on-drag"
                        data={data}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.idMeal}
                        renderItem={({item}) => (
                            <View style={styles.item}>
                                <RecipeListItem item={item} />
                            </View>
                        )}
                        ListEmptyComponent={
                            !loading && searchPhrase.length > 0 ? (
                                <Text style={styles.noResultsText}>No meals found.</Text>
                            ) : null
                        }
                        contentContainerStyle={{paddingBottom: 10}}
                    />
                </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        flex: 1,
    },
    searchBar: {
        flexDirection: "row",
        width: "90%",
        height: 45,
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
        paddingHorizontal: 10,
        position: "relative",
    },
    searchIcon: {
        marginLeft: 10,
    },
    input: {
        fontSize: 18,
        marginLeft: 10,
        flex: 1,
    },
    crossIcon: {
        position: "absolute",
        right: 10,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        width: 360,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    text: {
        fontSize: 18,
    },
    errorText: {
        color: "red",
        marginTop: 10,
        fontSize: 16,
    },
    noResultsText: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
        color: "gray",
    },
    loader: {
        marginTop: 20,
    },
});
export default SearchBar;
