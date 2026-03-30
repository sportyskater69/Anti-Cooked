import { Text, View } from "react-native";

/*This is not what it will look like, its a placeholder until the screens are done and I can implement it */
export default function NavBar() {
    return (
        <View style={{ position: "absolute", bottom: 0, borderWidth: 1, borderRadius: 22, flexDirection: "row" }}>
            <Text>
                Home
            </Text>
            <Text>
                Hit List
            </Text>
            <Text>
                Lock in
            </Text>
            <Text>
                Profile
            </Text>
        </View>
    );
}