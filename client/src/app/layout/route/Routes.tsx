import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../../../features/home/HomePage";
import ActivityDashboard from "../../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../ActivityForm";
import ActivityDetailsPage from "../../../features/activities/details/ActivityDetailsPage";
import Counter from "../../../features/Counter";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "activities", element: <ActivityDashboard /> },
      { path: "activities/:id", element: <ActivityDetailsPage /> },
      { path: "createActivity", element: <ActivityForm  key='create'/> },
      { path: "manage/:id", element: <ActivityForm key='edit'/> },
      { path: "counter", element: <Counter/> },
    ],
  },
  
]);
