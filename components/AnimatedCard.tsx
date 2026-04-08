import React, { useRef } from "react";
import { Animated, Easing } from "react-native";

export default function AnimatedCard({ children, style }: any) {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.timing(scaleAnim, {
            toValue: 0.98,
            duration: 200,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 200,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View
            onTouchStart={handlePressIn}
            onTouchEnd={handlePressOut}
            style={[style, { transform: [{ scale: scaleAnim }] }]}
        >
            {children}
        </Animated.View>
    );
}