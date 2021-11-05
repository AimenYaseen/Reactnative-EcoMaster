import { createNavigationContainerRef } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function replace(...args) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(...args));
  }
}
