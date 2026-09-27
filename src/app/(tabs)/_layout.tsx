import SafeAreaView from "@/components/SafeAreaView";
import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import { Alert, Pressable, Text, View } from "react-native";

const TabLayout = () => {
  const { isSignedIn, isLoaded, signOut } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href={"/(auth)/sign-up"} />;
  }

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log("Error signing out:", error);
      Alert.alert("Error", "Failed to sign out. Please try again.");
    }
  };

  return (
    <SafeAreaView>
      <View className="flex-1 items-center justify-center bg-[#0E1012] p-5">
        <Pressable
          onPress={handleSignOut}
          className="rounded-full bg-red-600 px-6 py-3 active:opacity-80"
        >
          <Text className="font-semibold text-white">Sign Out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default TabLayout;
