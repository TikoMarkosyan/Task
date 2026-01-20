export const Route = Object.freeze({
  HomeScreen: "HomeScreen",
  CollectedRewardsScreen: "CollectedRewardsScreen",

  getRouteKeys(): string[] {
    return Object.keys(this) as string[];
  },
});

export const ToastType = Object.freeze({
  Error: "error",
});
