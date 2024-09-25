import { Stack } from "expo-router";

export default function layout() {
    return (
    <Stack>
    <Stack.Screen name="list" options={{headerShown:false}}/>
    </Stack>
    );
};