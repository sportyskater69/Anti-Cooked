import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function NavBar() {
    const navigation = useNavigation();

    const goTo = (screen: string) => {
        navigation.navigate(screen as never);
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={() => goTo("HomeScreen")} style={styles.item}>
                <Text style={styles.text}>Home</Text>
            </Pressable>

            <Pressable onPress={() => goTo("HitList")} style={styles.item}>
                <Text style={styles.text}>Hit List</Text>
            </Pressable>

            <Pressable onPress={() => goTo("LockIn")} style={styles.item}>
                <Text style={styles.text}>Lock In</Text>
            </Pressable>

            <Pressable onPress={() => goTo("Profile")} style={styles.item}>
                <Text style={styles.text}>Profile</Text>
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
    text: {
        color: "#f0bd8b",
        fontSize: 14,
        fontWeight: "600",
    },
});