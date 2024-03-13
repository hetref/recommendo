"use client";

import { createActivity } from "@/lib/actions/activities";
import { useState } from "react";
import { storage } from "@/firebase/config";
// import { getStorage, uploadBytes } from "firebase/storage";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from "firebase/storage";
function page() {
  const [name, setName] = useState("");
  const [tags, setTags] = useState();
  const [description, setDescription] = useState("");
  const [date, setDate] = useState();
  const [bannerImage, setBannerImage] = useState("");
  const [downloadURL, setDownloadURL] = useState("");

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
          setDownloadURL(downloadurl);
          const data = await createActivity({
            name,
            description,
            date,
            tags: tags.split(","),
            downloadURL,
          });

          console.log(data);
        }
      );
    }
  };
  const saveData = async (e) => {
    e.preventDefault();
    await uploadImage();

    // console.log(data);
    console.log(name, tags, description, date, downloadURL);
  };

  return (
    <div>
      <h1>Add Activities</h1>
      <form>
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
        <input
          type="file"
          placeholder="Upload banner image"
          onChange={(e) => setBannerImage(e.target.files[0], "bannerImage")}
        />
      </form>
      <button onClick={(e) => saveData(e)}>Add Activity</button>
    </div>
  );
}

export default page;
