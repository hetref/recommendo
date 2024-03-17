import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CalendarRangeIcon, Filter, Pipette, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { findUser } from "@/lib/actions/user";
import { findAllActivities } from "@/lib/actions/activities";
import { redirect } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import Link from "next/link";

export default function Header({ authUser }) {
  console.log(authUser);
  const [userData, setUserData] = useState();
  const [activities, setActivities] = useState();
  const [filteredActivities, setFilteredActivities] = useState(); // State for filtered activities
  const [searchInput, setSearchInput] = useState(""); // State for search input
  const [tagsList, setTagsList] = useState(); // All the tags used in the activities
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [date, setDate] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await findUser(authUser);
        console.log(user);
        setUserData(user);

        // if (user?.bio) {
        // } else {
        //   redirect("/admin");
        // }

        const allActivities = await findAllActivities();
        console.log("ALL ACTIVITIES", allActivities);
        setActivities(allActivities);

        // I want to set all the new tags used in the tagsList array, and remove all the duplicated tags so that I can show all the tags used in the activities
        const tags = allActivities.map((activity) => activity.tags).flat();

        // remove all the duplicated tags
        const uniqueTags = [...new Set(tags)];

        // I want to arrange the uniqueTags in a way so that I get my matched tags first and then the unmatched tags from the user
        const matchedTags = user.interests.filter((tag) =>
          uniqueTags.includes(tag)
        );
        const unmatchedTags = uniqueTags.filter(
          (tag) => !user.interests.includes(tag)
        );
        const arrangedTags = [...matchedTags, ...unmatchedTags];

        console.log("Tags", tags);
        console.log("Unique Tags", uniqueTags);
        console.log("Arranged Tags", arrangedTags);
        setTagsList(arrangedTags);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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
      console.log("Filtered", filteredActivities);

      // Set the filtered and sorted activities to state
      setFilteredActivities(filteredActivities);
    }
  };

  useEffect(() => {
    if (userData && activities) {
      // Filter and sort activities based on user interests and activity tags

      filterAndSortActivities();
    }
  }, [userData, activities]);

  const searchHandler = () => {
    if (searchInput === "") {
      // If search input is empty, display users activities
      filterAndSortActivities();
      return;
    }

    // Filter activities based on search input
    const filteredActivities = activities.filter((activity) =>
      activity.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    setFilteredActivities(filteredActivities);
  };

  const filterActivitiesDialog = () => {
    // Filter and sort activities based on selected filters
    console.log(selectedFilters);

    if (selectedFilters.length === 0 && !date) {
      filterAndSortActivities();
      return;
    }

    // I want to show all the activities which atleast contains 1 tag from the selectedFilters
    if (selectedFilters.length === 0 && date) {
      // Format of date: 2024-03-15
      const formattedDate = format(date, "yyyy-MM-dd");
      const filteredActivities = activities.filter(
        (activity) => activity.date === formattedDate
      );
      console.log(filteredActivities);
      setFilteredActivities(filteredActivities);
      return;
    }

    if (selectedFilters.length !== 0 && !date) {
      const filteredActivities = activities.filter((activity) =>
        selectedFilters.some((tag) => activity.tags.includes(tag))
      );
      console.log(filteredActivities);
      setFilteredActivities(filteredActivities);
      return;
    }

    // If both selectedFilters and date are selected
    const formattedDate = format(date, "yyyy-MM-dd");
    const filteredActivities = activities.filter(
      (activity) =>
        activity.date === formattedDate &&
        selectedFilters.some((tag) => activity.tags.includes(tag))
    );

    console.log(date);

    setFilteredActivities(filteredActivities);
  };

  console.log("USERDATA", userData);

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="max-w-7xl w-full">
          {userData?.bio === "" ? (
            <></>
          ) : (
            <>{/* <Link href="/admin">Admin Panel</Link> */}</>
          )}

          {userData?.interests.length === 0 && (
            <div>
              <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>Skills & Interests!</AlertTitle>
                <AlertDescription>
                  Interests & Skills are not added yet. Please add your
                  interests in profile page. Please add interests to search the
                  events
                </AlertDescription>
              </Alert>
              <div className="grid grid-cols-3 gap-10 mt-10">
                {/* //MAP THROUGH ACTIVITIES AND DISPLAY THEM */}
                {activities?.map((activity) => (
                  <div
                    key={activity.id}
                    className="border-2 border-black px-6 py-4 rounded"
                  >
                    <h1 className="text-2xl font-bold mb-2">{activity.name}</h1>
                    <p className="text-black/80 mb-2">{activity.description}</p>
                    <p className="text-black/80 mb-4">{activity.date}</p>
                    <div className="flex gap-x-4 gap-y-1 flex-wrap">
                      {
                        //DISPLAY MATCHING TAGS
                        activity.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-cyan-800/80 text-white px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(userData?.bio === "" || userData?.bio.length === 0) &&
            userData?.interests.length !== 0 && (
              //DISPLAY FILTERED ACTIVITIES
              <>
                {/* Add a Search bar which filters activities based on name */}
                <div className="flex justify-center items-center my-8">
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search activities"
                    className="border-2 px-6 py-2 rounded-full mr-4 w-[400px]"
                  />

                  <button
                    onClick={searchHandler}
                    className="border-2 border-cyan/80 bg-cyan-800 text-white text-[16px] px-6 py-2 rounded-full"
                  >
                    Search
                  </button>

                  <AlertDialog>
                    <AlertDialogTrigger>
                      <button className="border-2 border-cyan/80 bg-cyan-800 text-white text-[16px] px-6 py-2 rounded-full flex gap-2 justify-center items-center">
                        <Filter className="w-4 h-4" /> Filters
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              // className={cn(
                              //   "w-[240px] justify-start text-left font-normal",
                              //   !date && "text-muted-foreground"
                              // )}
                              className="w-[240px] justify-start text-left font-normal"
                            >
                              {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
                              <CalendarRangeIcon className="mr-2 h-4 w-4" />
                              {date ? (
                                format(date, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <AlertDialogTitle>Select Filters</AlertDialogTitle>
                        <div className="flex flex-wrap gap-4 h-[500px] overflow-y-scroll border-2 px-6 py-2 rounded">
                          {tagsList?.map((tag) => (
                            <label key={tag}>
                              <input
                                type="checkbox"
                                value={tag}
                                checked={selectedFilters.includes(tag)}
                                className="mr-2"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedFilters((prev) => [
                                      ...prev,
                                      tag,
                                    ]);
                                  } else {
                                    setSelectedFilters((prev) =>
                                      prev.filter((item) => item !== tag)
                                    );
                                  }
                                }}
                              />
                              {tag}
                            </label>
                          ))}
                        </div>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        {/* <AlertDialogAction onClick={filterActivitiesDialog}>
                      Filter
                    </AlertDialogAction> */}
                        <button onClick={filterActivitiesDialog}>Filter</button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                <div className="grid grid-cols-3 gap-10">
                  {/* //MAP THROUGH FILTERED ACTIVITIES AND DISPLAY THEM */}
                  {filteredActivities?.length === 0 && (
                    <div>
                      <Alert>
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>No Data</AlertTitle>
                        <AlertDescription>No activities found</AlertDescription>
                      </Alert>
                    </div>
                  )}
                  {filteredActivities?.map((activity) => (
                    <div
                      key={activity.id}
                      className="border-2 border-black px-6 py-4 rounded"
                    >
                      <h1 className="text-2xl font-bold mb-2">
                        {activity.name}
                      </h1>
                      <p className="text-black/80 mb-2">
                        {activity.description}
                      </p>
                      <p className="text-black/80 mb-4">{activity.date}</p>
                      <div className="flex gap-x-4 gap-y-1 flex-wrap">
                        {
                          //DISPLAY MATCHING TAGS
                          activity.tags.map((tag) => (
                            <span
                              key={tag}
                              className="bg-cyan-800/80 text-white px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
        </div>
      </div>
    </>
  );
}
