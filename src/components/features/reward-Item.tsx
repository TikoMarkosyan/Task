import React, { useCallback } from 'react';

import  RewardItemView  from 'src/components/ui/render-item.view';
import { useRewards } from 'src/hooks/useRewards';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { COLLECT_REWARD } from 'src/redux/slices/rewardsSlice';

interface Props {
  id: string;
  showCollectedOpacity?: boolean;
}

const RewardItem = ({ id, showCollectedOpacity = true }: Props) => {
  const dispatch = useAppDispatch();
  const reward = useRewards().getRewardById(id);
  
  const isCollected = useAppSelector(state => 
    state.rewards.collectedIds.includes(id)
  );

  const handleCollect = useCallback((rewardId: string) => {
    dispatch(COLLECT_REWARD(rewardId));
  }, [dispatch]);

  if (!reward) return null;

  return (
    <RewardItemView 
      reward={reward} 
      isCollected={isCollected} 
      onCollect={handleCollect} 
      showCollectedOpacity={showCollectedOpacity}
    />
  );
};

export default React.memo(
  RewardItem,
  (prev, next) =>
    prev.id === next.id &&
    prev.showCollectedOpacity === next.showCollectedOpacity
);