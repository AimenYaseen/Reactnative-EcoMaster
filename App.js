import React from "react";
import { LogBox } from "react-native";

import Index from "./App/index";

export default () => {
  React.useEffect(() => {
    // console.ignoredYellowBox = ['Setting a timer'];
    LogBox.ignoreLogs(["Warning: Setting a timer"]);
  }, []);

  return <Index />;
};
