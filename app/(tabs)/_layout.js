import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons"
import { BottomNavIcon } from "../../components/BottomNavIcon";

const tabs = [
    {
        name: "home/index",
        title: "Home",
        icon: "home-outline",
        iconFocused: "home"
    },
    {
        name: "search/index",
        title: "Search",
        icon: "search-outline",
        iconFocused: "search"
    },
    {
        name: "favorites/index",
        title: "Favorites",
        icon: "heart-outline",
        iconFocused: "heart"
    }
]

export default function TabsLayout() {
    return (
        <Tabs>
            {tabs.map(({ name, title, icon, iconFocused }) => (
                <Tabs.Screen
                    key={name}
                    name={name}
                    options={{
                        title,
                        tabBarIcon: ({ color, focused }) => (
                            <BottomNavIcon
                                name={{ icon, iconFocused }}
                                color={color}
                                focused={focused}
                            />
                        ),
                    }}
                />
            ))}
        </Tabs>
    )
}