import React, { useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import Loader from "src/components/ui/loader";
import RewardItem from "src/components/features/reward-Item";
import  AnimatedButton  from "src/components/ui/animated-button";
import { useRootNavigation } from "src/hooks/navigation";
import { useRewards } from "src/hooks/useRewards";
import { fetchRewards } from "src/redux/slices/rewardsSlice";
import { useAppDispatch } from "src/redux/hooks";
import { isAndroid } from "src/utils/appSettings";
import { Route } from "src/utils/constants";

const LIMIT_PER_PAGE = 20;

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useRootNavigation();
  const insets = useSafeAreaInsets();
  const { rewardIds, loading, currentPage, collectedIds } = useRewards();

  const renderItem = useCallback(
    ({ item }: { item: string | number }) => (
      <RewardItem id={item.toString()}  />
    ),
    [],
  );

  const ListFooter = () => {
    if(loading) {
      return <Loader />;
    }
  }
  const handleEndReached = useCallback(() => {
    if (!loading) {
      dispatch(fetchRewards({ page: currentPage + 1, limit: LIMIT_PER_PAGE }));
    }
  }, [loading, currentPage, dispatch]);

  useEffect(() => {
    dispatch(fetchRewards({ page: 1, limit: LIMIT_PER_PAGE }));
  }, [dispatch]);

  return (
    <SafeAreaView style={[styles.container,  { paddingBottom:  (isAndroid ? insets.bottom + 24 : 0) }]}>
      <FlashList
        data={rewardIds}
        keyExtractor={id => id.toString()}
        renderItem={renderItem}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={ListFooter}
        showsVerticalScrollIndicator={false}
        maxItemsInRecyclePool={20}
      />
      <AnimatedButton onPress={() => {
        navigation.navigate(Route.CollectedRewardsScreen);
      }} text="Claim Rewards" visible={collectedIds.length > 0} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  item: {
    padding: 12,
    fontSize: 16,
  },
});

export default HomeScreen;
