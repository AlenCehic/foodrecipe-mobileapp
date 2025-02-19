import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    TextInput,
    View,
    Keyboard,
    FlatList,
    Text,
    Image,
    ActivityIndicator
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

const SearchBar = () => {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (searchPhrase.length > 0) {
            fetchData();
        } else {
            setData([]);
        }
    }, [searchPhrase]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchPhrase}`);
            const result = await response.json();
            setData(result.meals || []);
        } catch (error) {
            console.error("Fehler beim Laden der Daten: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={clicked ? styles.searchBar_clicked : styles.searchBar_unclicked}>
                <Feather name="search" size={20} color="#FF5E00" style={{ marginLeft: 10 }} />
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    value={searchPhrase}
                    onChangeText={setSearchPhrase}
                    onFocus={() => setClicked(true)}
                />
                {clicked && (
                    <Entypo
                        name="cross"
                        size={20}
                        color="#FF5E00"
                        style={{ marginRight: 10 }}
                        onPress={() => {
                            setSearchPhrase("");
                            Keyboard.dismiss();
                            setClicked(false);
                        }}
                    />
                )}
            </View>
            {loading && <ActivityIndicator size="large" color="#FF5E00" />}
            <FlatList
                data={data}
                keyExtractor={(item) => item.idMeal}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Image source={{ uri: item.strMealThumb }} style={styles.image} />
                        <Text style={styles.text}>{item.strMeal}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
    },
    searchBar_unclicked: {
        flexDirection: "row",
        width: "90%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
        paddingHorizontal: 10,
    },
    searchBar_clicked: {
        flexDirection: "row",
        width: "90%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
    input: {
        fontSize: 18,
        marginLeft: 10,
        width: "80%",
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        width: 300,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
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
});

export default SearchBar;
