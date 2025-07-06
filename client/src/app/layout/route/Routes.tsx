import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../../../features/home/HomePage";
import ActivityDashboard from "../ActivityDashboard";
import ActivityForm from "../ActivityForm";
import ActivityDetails from "../ActivityDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "activities", element: <ActivityDashboard /> },
      { path: "activities/:id", element: <ActivityDetails /> },
      { path: "createActivity", element: <ActivityForm  key='create'/> },
      { path: "manage/:id", element: <ActivityForm key='edit'/> },
    ],
  },
  
]);
