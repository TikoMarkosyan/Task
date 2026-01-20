import React, { useCallback } from "react";
import { Text, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { useRewards } from "src/hooks/useRewards";
import RewardItem from "src/components/features/reward-Item";
import Button from "src/components/ui/button";
import { useRootNavigation } from "src/hooks/navigation";
import { isAndroid } from "src/utils/appSettings";

const CollectedRewardsScreen: React.FC = () => {
  const navigator = useRootNavigation();
  const { collectedIds } = useRewards();
  const insets = useSafeAreaInsets();
  
  const renderItem = useCallback(
    ({ item }: { item: string | number }) => (
      <RewardItem
        id={item.toString()}
        showCollectedOpacity={false}
      />
    ),
    [],
  );

  return (
   <SafeAreaView style={[styles.container,  { paddingBottom:  (isAndroid ? insets.bottom + 24 : 0) }]}>
      <View style={styles.headerContainer}>
      <Button onPress={() => {
        navigator.goBack();
      }} text={'\u2190'} style={styles.button} textStyle={styles.buttonText} />
      <Text style={styles.title}>Collected Rewards</Text>
      </View>
      <FlashList
        data={collectedIds}
        keyExtractor={id => id.toString()}
        renderItem={renderItem}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    padding: 0,
  },
  headerContainer: {
    position: "relative",
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  button: {
    width: 40,
    height: 36,
    paddingVertical: 0,
    paddingHorizontal: 8,
    backgroundColor: "#343333ff",
  },
  buttonText: {
    fontSize: 15,
    color: "#ffffff",
  },
  title: {
    flex: 1,
    fontSize: 20,
    textAlign: "center",
    alignContent: "center",
    fontWeight: "bold",
  },
  item: {
    padding: 12,
    fontSize: 16,
  },
});

export default CollectedRewardsScreen;
