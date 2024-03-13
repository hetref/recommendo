"use client";

import { createActivity } from "@/lib/actions/activities";
import { useState } from "react";

function page() {
  //   const addActivity = async () => {
  //     console.log(date);
  //     const newAct = await createActivity({
  //       name,
  //       tags,
  //       description,
  //       date,
  //     });
  const addActivity = async (e) => {
    e.preventDefault();

    const newAct = await createActivity({
      name,
      tags,
      description,
      date,
    });

    console.log(newAct);
  };
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  //   const [bannerImage, setBannerImage] = useState("");

  return (
    <div>
      <h1>Add Activities</h1>
      <form onSubmit={addActivity}>
        <input
          type="text"
          placeholder="Enter activity name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {/* <input type="file" placeholder="Upload banner image" /> */}
        <button type="submit">Add Activity</button>
      </form>
    </div>
  );
}

export default page;
