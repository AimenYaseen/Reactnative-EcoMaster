import React from "react";
import Navigation from "./src/Navigation/Navigation";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as AdminAuthProvider } from "./src/Admin/AdminContext/AdminAuthContext";
import { Provider as PostProvider } from "./src/context/PostContext";
import { Provider as UserProvider } from "./src/context/UserContext";
import { Provider as NewsProvider } from "./src/Admin/AdminContext/NewsContext";
import { Provider as CustomProvider } from "./src/Admin/AdminContext/CustomContext";
import { Provider as HabitProvider } from "./src/Admin/AdminContext/HabitContext";
import { Provider as CustomHabitProvider } from "./src/context/CustomHabitContext";
import { Provider as ActivityProvider } from "./src/context/ActivityContext";
import { Provider as HabitTrackerProvider } from "./src/context/HabitTrackerContext";

export default () => {
  return (
    <HabitTrackerProvider>
      <ActivityProvider>
        <CustomHabitProvider>
          <HabitProvider>
            <CustomProvider>
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
            </CustomProvider>
          </HabitProvider>
        </CustomHabitProvider>
      </ActivityProvider>
    </HabitTrackerProvider>
  );
};
