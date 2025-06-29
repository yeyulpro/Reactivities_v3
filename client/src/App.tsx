import { useEffect, useState } from "react"


function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  useEffect(() => {
     fetch("https://localhost:5001/api/activities")
     .then(response => response.json())
     .then((data) =>  {
      console.log("My data is "+data);
      setActivities(data)
     })
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
