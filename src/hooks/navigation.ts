import { useNavigation, NavigationProp } from "@react-navigation/native";

import { RootStackParamList } from "src/navigators/index.models";

export const useRootNavigation = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const navigateBack = async () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return {
    ...navigation,
    navigateBack,
  };
};
