import { useSSO } from "@clerk/expo";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { OAUTH } from "../../../constants";

const SignUp = () => {
  const { startSSOFlow } = useSSO();
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);

  const isGoogleClicked = loadingStrategy === OAUTH.GOOGLE_OAUTH;
  const isAppleClicked = loadingStrategy === OAUTH.APPLE_OAUTH;

  const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple") => {
    setLoadingStrategy(strategy);

    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });

      if (!createdSessionId || !setActive) {
        Alert.alert(
          "Sign-in incomplete",
          "Sign-in did not complete. Please try again.",
        );
        return;
      }

      await setActive({ session: createdSessionId });
      Alert.alert("Signed in successfully");
    } catch (error) {
      console.log("Error in social auth", error);
      Alert.alert("Failed to sign in. Please try again.");
    } finally {
      setLoadingStrategy(null);
    }
  };

  const brandName = ":)";

  return (
    <View className="flex-1 bg-[#0E1012]">
      <StatusBar style="light" />

      <View className="absolute top-0 left-0 right-0 h-[60%] overflow-hidden">
        <Image
          source={require("@/assets/images/hero.png")}
          style={{ height: "100%", width: "100%" }}
          resizeMode="cover"
        />

        <LinearGradient
          pointerEvents="none"
          colors={[
            "transparent",
            "transparent",
            "rgba(14, 16, 18, 0.85)",
            "#0E1012",
          ]}
          locations={[0, 0.4, 0.75, 1]}
          style={StyleSheet.absoluteFill}
        />
      </View>

      <View className="flex-1 justify-between px-7 pb-8 pt-12">
        <View className="z-10">
          <Text className="text-xl font-medium tracking-[10px] text-white">
            {brandName}
          </Text>
        </View>

        <View className="z-10">
          <View className="gap-2">
            <Text className="text-[42px] leading-[45px] font-semibold tracking-[-1.5px] text-white">
              Good things
            </Text>

            <Text className="text-[42px] leading-[45px] font-semibold tracking-[-1.5px] text-[#D7B99B]">
              are waiting.
            </Text>

            <Text className="mt-3 max-w-[310px] text-base leading-6 text-[#A7A4A0]">
              Sign in to continue exploring our curated collection.
            </Text>
          </View>

          <View className="mt-7 gap-3">
            <Pressable
              className={`flex-row items-center justify-center gap-3 rounded-full border border-[#3A3937] bg-[#121418]/80 py-4 active:opacity-80 ${isAppleClicked ? "opacity-70" : ""}`}
              onPress={() => handleSocialAuth("oauth_apple")}
            >
              <Image
                source={require("@/assets/images/apple.png")}
                style={{ width: 21, height: 21, tintColor: "white" }}
              />
              <Text className="text-base font-semibold text-white">
                {isAppleClicked
                  ? "Connecting with Apple..."
                  : "Continue with Apple"}
              </Text>
            </Pressable>

            <Pressable
              className={`flex-row items-center justify-center gap-3 rounded-full bg-[#F4F0EA] py-4 active:opacity-80 ${isGoogleClicked ? "opacity-70" : ""}`}
              onPress={() => handleSocialAuth("oauth_google")}
            >
              <Image
                source={require("@/assets/images/google.png")}
                style={{ width: 21, height: 21 }}
              />
              <Text className="text-base font-semibold text-[#181716]">
                {isGoogleClicked
                  ? "Connecting with Google..."
                  : "Continue with Google"}
              </Text>
            </Pressable>
          </View>

          <Text className="mx-auto mt-7 w-[88%] text-center text-xs leading-5 text-[#77736F]">
            By continuing, you agree to our{" "}
            <Text className="text-[#B8B2AC]">Terms of Service</Text> and{" "}
            <Text className="text-[#B8B2AC]">Privacy Policy</Text>.
          </Text>

          <View className="mt-7 h-1 w-32 self-center rounded-full bg-white" />
        </View>
      </View>
    </View>
  );
};

export default SignUp;
