import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { findUser } from "@/lib/actions/user";
import { findAllActivities } from "@/lib/actions/activities";
import { redirect } from "next/navigation";

export default function Header({ authUser }) {
  console.log(authUser);
  const [userData, setUserData] = useState();
  const [activities, setActivities] = useState();
  const [filteredActivities, setFilteredActivities] = useState(); // State for filtered activities

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await findUser(authUser);
        console.log(user);
        setUserData(user);

        if (user?.bio) {
        } else {
          redirect("/admin");
        }

        const allActivities = await findAllActivities();
        console.log(allActivities);
        setActivities(allActivities);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (userData && activities) {
      // Filter and sort activities based on user interests and activity tags
      const filterAndSortActivities = () => {
        if (userData.interests.length === 0) {
          // If no interests added, display all activities
          setFilteredActivities(activities);
        } else {
          // If interests added, apply filtering and sorting logic
          const filteredActivities = activities.map((activity) => {
            const matchingTags = userData.interests.filter((tag) =>
              activity.tags.includes(tag)
            );
            return {
              ...activity,
              matchingTagsCount: matchingTags.length,
            };
          });

          // Sort filtered activities based on matching tags count in descending order
          filteredActivities.sort(
            (a, b) => b.matchingTagsCount - a.matchingTagsCount
          );

          // Set the filtered and sorted activities to state
          setFilteredActivities(filteredActivities);
        }
      };

      filterAndSortActivities();
    }
  }, [userData, activities]);

  return (
    <>
      {userData?.interests.length === 0 && (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Yedya Bhokachya</AlertTitle>
          <AlertDescription>
            Interests & Skills add kar profile madhe
          </AlertDescription>
        </Alert>
      )}
      <h1>Hello</h1>
      {userData?.interests.length === 0 && (
        //DISPLAY ALL ACTIVITIES
        <div>
          {/* //MAP THROUGH ACTIVITIES AND DISPLAY THEM */}
          {activities?.map((activity) => (
            <div key={activity.id}>
              <ul>
                <li>
                  <h1>{activity.name}</h1>
                </li>
                <li>
                  <p>{activity.description}</p>
                </li>
                <li>
                  <p>{activity.date}</p>
                </li>
              </ul>
            </div>
          ))}
        </div>
      )}

      {userData?.interests.length !== 0 && (
        //DISPLAY FILTERED ACTIVITIES
        <div>
          {/* //MAP THROUGH FILTERED ACTIVITIES AND DISPLAY THEM */}
          {filteredActivities?.map((activity) => (
            <div key={activity.id}>
              <ul>
                <li>
                  <h1>-{activity.name}</h1>
                </li>
                <li>
                  <p>{activity.description}</p>
                </li>
                <li>
                  <p>{activity.date}</p>
                </li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
