import React from "react";
import Navigation from "./src/Navigation/Navigation";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as AdminAuthProvider } from "./src/Admin/AdminContext/AdminAuthContext";
import { Provider as UserProvider } from "./src/context/UserContext";

export default () => {
  return (
    <AuthProvider>
      <UserProvider>
        <AdminAuthProvider>
          <Navigation />
        </AdminAuthProvider>
      </UserProvider>
    </AuthProvider>
  );
};
