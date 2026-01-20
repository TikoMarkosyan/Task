import React, { useRef, useEffect } from "react";
import { Animated, StyleSheet } from "react-native";

import Button, { IButtonProps } from "./button";


interface IAnimatedButtonProps extends IButtonProps {
  visible?: boolean;
}

const AnimatedButton: React.FC<IAnimatedButtonProps> = ({
  visible = true,
  ...props
}) => {
  const translateY = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : 100,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
     <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <Button {...props} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
});

export default AnimatedButton;
