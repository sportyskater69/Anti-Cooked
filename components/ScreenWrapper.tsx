import { SafeAreaView } from "react-native-safe-area-context";

export default function ScreenWrapper({ children }: { children: React.ReactNode }) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "rgb(67, 53, 46)" }}>
            {children}
        </SafeAreaView>
    );
}