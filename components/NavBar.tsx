import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, View } from "react-native";

type TabRoutes = "HomeScreen" | "HitList" | "LockIn" | "Profile";

export default function NavBar() {
    const navigation = useNavigation<any>();

    const goTo = (screen: TabRoutes) => {
        navigation.navigate(screen);
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={() => goTo("HomeScreen")} style={styles.item}>
                <MaterialIcons name="home" size={26} color="#f0bd8b" />
            </Pressable>

            <Pressable onPress={() => goTo("HitList")} style={styles.item}>
                <MaterialIcons name="track-changes" size={26} color="#f0bd8b" />
            </Pressable>

            <Pressable onPress={() => goTo("LockIn")} style={styles.item}>
                <MaterialIcons name="lock" size={26} color="#f0bd8b" />
            </Pressable>

            <Pressable onPress={() => goTo("Profile")} style={styles.item}>
                <MaterialIcons name="person" size={26} color="#f0bd8b" />
            </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,

        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",

        backgroundColor: "#2b1a10",
        paddingVertical: 14,
        borderRadius: 20,

        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    item: {
        paddingHorizontal: 10,
    },
});