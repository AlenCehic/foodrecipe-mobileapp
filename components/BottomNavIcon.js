import Ionicons from "@expo/vector-icons/Ionicons"

export function BottomNavIcon({ name, color, focused }) {
    const iconName = focused ? name.iconFocused : name.icon
    return <Ionicons size={28} style={{ marginBottom: -2 }} name={iconName} color={color} />
}