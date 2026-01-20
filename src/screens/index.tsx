import React from "react";

import AppNavigator from "src/navigators";
import Toast from "src/components/ui/toast";

const MainScreen: React.FC = () => {
  
  return (
    <>
     <AppNavigator />
     <Toast />
    </>
  );
};

export default MainScreen;
