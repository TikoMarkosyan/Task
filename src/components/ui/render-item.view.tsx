import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";

import Button from "./button";
import { IRewardResponse } from "src/models/response/IRewardResponse";

interface RewardItemViewProps {
  isCollected: boolean;
  showCollectedOpacity?: boolean;
  reward: IRewardResponse;
  onCollect: (id: string) => void;
}

const RewardItemView = React.memo(
  ({
    reward,
    isCollected,
    showCollectedOpacity = true,
    onCollect,
  }: RewardItemViewProps) => {
    return (
      <View
        style={[
          styles.card,
          isCollected && showCollectedOpacity && styles.collectedOpacity,
        ]}
      >
        <FastImage
          style={styles.image}
          source={{
            uri: reward.image,
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          defaultSource={require("../../assets/images/placeholder.png")}
          resizeMode={FastImage.resizeMode.cover}
        />

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {reward.name}
          </Text>
          <View style={styles.infoContainer}>
          <Text style={styles.points}>Points: {reward.needed_points}</Text>
          <Text style={styles.points}>Amount: {reward.amount}</Text>

          </View>

          {isCollected ? (
            <Text style={[styles.statusText, styles.collectedText]}>
              ✓ Collected
            </Text>
          ) : (
            <Button
              disabled={isCollected}
              style={styles.button}
              onPress={() => onCollect(reward.id)}
              textStyle={styles.buttonText}
              text={"✓ Collected"}
            />
          )}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  collectedOpacity: { opacity: 0.5 },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  infoContainer: {
    marginVertical: 4,
  },
  content: { flex: 1, marginLeft: 16, justifyContent: "space-between" },
  title: { fontSize: 16, fontWeight: "700", color: "#1a1a1a" },
  points: { fontSize: 14, color: "#666"},
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  statusText: { fontSize: 14, fontWeight: "600" },
  collectedText: { color: "#007AFF" },
});

export default RewardItemView;
