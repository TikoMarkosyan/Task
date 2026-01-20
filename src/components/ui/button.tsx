import React from "react";
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native";

export interface IButtonProps {
  onPress?: () => void;
  text: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<IButtonProps> = ({ onPress, text, style, textStyle, disabled }) => (
  <TouchableOpacity style={[styles.buttonInner, style]} onPress={onPress} disabled={disabled}>
    <Text style={[styles.buttonText, textStyle]}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonInner: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default Button;
