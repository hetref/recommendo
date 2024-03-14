"use client";

import { createActivity } from "@/lib/actions/activities";
import { useEffect, useState } from "react";
import { auth, storage } from "@/firebase/config";
// import { getStorage, uploadBytes } from "firebase/storage";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from "firebase/storage";
import { findUser } from "@/lib/actions/user";
function page() {
  const [activities, setActivities] = useState([]);

  const [name, setName] = useState("");
  const [tags, setTags] = useState();
  const [description, setDescription] = useState("");
  const [date, setDate] = useState();
  const [bannerImage, setBannerImage] = useState("");
  // const [downloadURL, setDownloadURL] = useState("");

  //   const userId = auth.currentUser;

  useEffect(() => {
    const fetchActivities = async () => {
      const data = await findUser(auth?.currentUser?.uid);
      console.log(data);
      console.log(auth.currentUser);
      //   setActivities(data.activities);
    };
    fetchActivities();
  }, [auth?.currentUser]);

  const uploadImage = async () => {
    if (bannerImage) {
      console.log(bannerImage.name);
      const storageRef = ref(storage, `images/${bannerImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, bannerImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is " + ${progress} + "% done`);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          const downloadurl = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("Upload is done");
          console.log("Download URL:", downloadurl);
          console.log("Upload is done");
          // setDownloadURL(downloadurl);
          const data = await createActivity({
            name,
            description,
            date,
            tags: tags.split(","),
            downloadURL: downloadurl,
            author: user.uid,
          });

          console.log(data);
        }
      );
    }
  };
  const saveData = async (e) => {
    e.preventDefault();
    await uploadImage();
    // setActivities([...activities, { name, description, date, tags }]);

    // console.log(data);
    // console.log(name, tags, description, date, downloadURL);
  };

  return (
    <div className="p-4 flex justify-center items-center h-screen overflow-auto m-10">
      <div className="grid grid-cols-2 gap-8 border-2 rounded-md p-8 bg-slate-200 mt-8">
        <div>
          <h2 className="text-lg font-bold mb-2">Add Activity</h2>
          <form onSubmit={saveData}>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="w-full border border-gray-300 rounded px-3 py-2"
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="w-full border border-gray-300 rounded px-3 py-2"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="bannerImage"
              >
                Banner Image
              </label>
              <input
                className="w-full border border-gray-300 rounded px-3 py-2"
                type="file"
                id="bannerImage"
                name="bannerImage"
                accept="image/*"
                onChange={(e) => setBannerImage(e.target.files[0])}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="tags">
                Tags
              </label>
              <input
                className="w-full border border-gray-300 rounded px-3 py-2"
                type="text"
                id="tags"
                name="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="eventDate"
              >
                Event Date
              </label>
              <input
                className="w-full border border-gray-300 rounded px-3 py-2"
                type="date"
                id="eventDate"
                name="eventDate"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Add Activity
            </button>
          </form>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-2">Activity List</h2>
          <ul>
            {activities?.map((activity, index) => (
              <li key={index} className="mb-4">
                <h3 className="text-lg font-bold">{activity.name}</h3>
                <p>{activity.description}</p>
                <p>Event Date: {activity.date}</p>
                <p>Tags: {activity.tags}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default page;
