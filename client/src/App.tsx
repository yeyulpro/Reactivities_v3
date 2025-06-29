import { useEffect, useState } from "react";
import axios from 'axios';


function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  useEffect(() => {
       axios
      .get<Activity[]>("https://localhost:5001/api/activities")
      .then(response => {
        console.log("📦 Data received:", response.data);
        setActivities(response.data);
      })
      .catch(error => console.log("❌ error occurs:", error));
      return ()=>{}
  }, [])

  return (
    <>
      <h1>Reactivities APP</h1>
      <ul>{
        activities.map(activity => (
          <li key={activity.id}>{activity.title}</li>
        ))

      }

      </ul>

    </>
  )
}

export default App
