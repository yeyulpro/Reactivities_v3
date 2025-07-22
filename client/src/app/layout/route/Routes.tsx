import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import HomePage from "../../../features/home/HomePage";
import ActivityDashboard from "../../../features/activities/dashboard/ActivityDashboard";
import ActivityDetailsPage from "../../../features/activities/details/ActivityDetailsPage";
import Counter from "../../../features/Counter";
import ActivityForm from "../../../features/activities/form/ActivityForm";
import TestErrors from "../../../features/error/TestErrors";
import NotFound from "../../../features/error/NotFound";

import LoginForm from "../../../features/account/LoginForm";
import RequireAuth from "./RequireAuth";
import RegisterForm from "../../../features/account/RegisterForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "activities", element: <ActivityDashboard /> },
          { path: "activities/:id", element: <ActivityDetailsPage /> },
          { path: "createActivity", element: <ActivityForm key="create" /> },
          { path: "manage/:id", element: <ActivityForm key="edit" /> },
        ],
      },
      { path: "", element: <HomePage /> },

      { path: "counter", element: <Counter /> },
      { path: "errors", element: <TestErrors /> },
      { path: "notfound", element: <NotFound /> },
      { path: "login", element: <LoginForm /> },
      { path: "register", element: <RegisterForm /> },
      { path: "*", element: <Navigate replace to ="/notfound" /> },
    ],
  },
]);
