import React from "react";
import { StyleProp, Text, View, ViewStyle, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RNToast, { ToastConfig } from "react-native-toast-message";


import { ToastType } from "src/models/common/ToastModel";

interface IToastProps {
  visibilityTime?: number;
  onHide?: () => void;
  onShow?: () => void;
  onPress?: () => void;
}

interface IToastContentProps {
  title?: string;
  message?: string;
  icon?: React.JSX.Element;
  contentStyle?: StyleProp<ViewStyle>;
}

interface IToastShowProps {
  title?: string;
  message?: string;
  type?: ToastType;
}

const toastConfig: ToastConfig = {
  error: toastProps => (
    <ToastContent
      {...toastProps.props}
      contentStyle={styles.errorContainer}
    />
  ),
};

const BORDER_RADIUS = 20;

const Toast: React.FC<Readonly<IToastProps>> = props => {
  const safeArea = useSafeAreaInsets();

  return (
    <RNToast
      autoHide
      visibilityTime={props.visibilityTime ?? 2000}
      topOffset={safeArea.top + 10}
      config={toastConfig}
      onHide={props.onHide}
      onShow={props.onShow}
      onPress={props.onPress}
    />
  );
};

const ToastContent: React.FC<IToastContentProps> = props => {
  return (
    <View style={styles.container}>
      <View style={[styles.content, props.contentStyle]}>
        <View style={styles.textContainer}>
          {props.title && <Text style={styles.title}>{props.title}</Text>}
          {props.message && <Text style={styles.message}>{props.message}</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    borderWidth: 1,
    borderColor: "#ededf2",
    borderRadius: BORDER_RADIUS,
    padding: 16,

    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
  },
  container: {
    width: "85%",
    maxWidth: 350,
    borderRadius: BORDER_RADIUS,
    backgroundColor: "#ffffff",
    shadowColor: "#6d6d8d",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 13,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: "#333333",
  },
  message: {
    color: "#666666",
  },
  errorContainer: {
    borderColor: "#f44336",
    backgroundColor: "#ffebee",
  },
});
const showToast = (props: IToastShowProps) =>
  RNToast.show({ props, type: props.type });

export { showToast };
export default Toast;
