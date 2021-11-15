import React from "react";
import Navigation from "./src/Navigation/Navigation";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as AdminAuthProvider } from "./src/Admin/AdminContext/AdminAuthContext";
import { Provider as PostProvider } from "./src/context/PostContext";
import { Provider as UserProvider } from "./src/context/UserContext";
import { Provider as NewsProvider } from "./src/Admin/AdminContext/NewsContext";

export default () => {
  return (
    <NewsProvider>
      <PostProvider>
        <AdminAuthProvider>
          <AuthProvider>
            <UserProvider>
              <Navigation />
            </UserProvider>
          </AuthProvider>
        </AdminAuthProvider>
      </PostProvider>
    </NewsProvider>
  );
};
