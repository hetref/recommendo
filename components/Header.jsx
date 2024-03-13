"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { findUser } from "@/lib/actions/user";
import { findAllActivities } from "@/lib/actions/activities";

export default function Header({ authUser }) {
  console.log(authUser);
  const [userData, setUserData] = useState();
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    const fetchUserD = async () => {
      try {
        const user = await findUser(authUser); // Assuming findUser is imported or defined in Header.jsx
        console.log(user);
        setUserData(user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserD();

    const getActivities = async () => {
      try {
        const act = await findAllActivities(); // Assuming findUser is imported or defined in Header.jsx
        console.log(act);
        setActivities(act);
      } catch (error) {
        console.error(error);
      }
    };
    getActivities();
  }, []);

  return (
    <>
      {userData?.interests.length === 0 && (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components and dependencies to your app using the cli.
          </AlertDescription>
        </Alert>
      )}
      <h1>Hello</h1>
      {userData?.interests.length === 0 && (
        //DISPLAY ALL ACTIVITIES
        <div>
          {/* //MAP THROUGH ACTIVITIES AND DISPLAY THEM */}

          {activities.map((activity) => (
            <div key={activity.id}>
              <h1>{activity.name}</h1>
              <p>{activity.description}</p>
              <p>{activity.date}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
