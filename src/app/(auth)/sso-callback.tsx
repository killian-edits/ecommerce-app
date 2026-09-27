import { Redirect } from "expo-router";

export default function SSOCallback() {
  // Clerk handles session activation under the hood.
  // Redirect the user back to your home or root route.
  return <Redirect href="/" />;
}
