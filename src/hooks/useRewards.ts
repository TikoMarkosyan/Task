import { useAppSelector } from "src/redux/hooks";
import { rewardsAdapterSelectors } from "src/redux/slices/rewardsSlice";


export const useRewards = () => {
  const state = useAppSelector(state => state.rewards);

  return {
    allRewards: rewardsAdapterSelectors.selectAll(state),
    rewardIds: rewardsAdapterSelectors.selectIds(state),
    getRewardById: (id: string) => rewardsAdapterSelectors.selectById(state, id),
    
    loading: state.loading,
    error: state.hasError,
    collectedIds: state.collectedIds,
    currentPage: state.currentPage,
  };
};