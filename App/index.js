import React from "react";
import Navigation from "./src/Navigation/Navigation";
import { Provider as AuthProvider } from "./src/context/AuthContext";

export default () => {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
};
