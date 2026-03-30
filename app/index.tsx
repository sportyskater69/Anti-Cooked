import { AuthProvider } from "@/context/AuthContext";
import RootNavigator from "@/navigation/RootNavigator";
export default function Index() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
