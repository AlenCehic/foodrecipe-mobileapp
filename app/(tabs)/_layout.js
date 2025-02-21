import { Tabs } from "expo-router";
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
];

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#FF5E00",
                tabBarInactiveTintColor: "#000000",
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "bold",
                },
            }}
        >
            {tabs.map(({ name, title, icon, iconFocused }) => (
                <Tabs.Screen
                    key={name}
                    name={name}
                    options={{
                        title,
                        tabBarIcon: ({ color, focused }) => (
                            <BottomNavIcon
                                name={{ icon, iconFocused }}
                                color="#FF5E00"
                                focused={focused}
                            />
                        ),
                    }}
                />
            ))}
        </Tabs>
    );
}
