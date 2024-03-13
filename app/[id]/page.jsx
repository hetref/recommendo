"use client";
import { findUser, updateUser } from "@/lib/actions/user";
import { PlusCircle, Trash } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RWebShare } from "react-web-share";

const page = ({ params: { id } }) => {
  console.log(id);
  const [userData, setUserData] = useState();
  const [titleShare, setTitleShare] = useState("");

  const successToast = (message) => {
    toast.success(message, {
      duration: 4000,
      position: "bottom-right",
    });
  };

  useEffect(() => {
    const fetchUserD = async () => {
      try {
        const user = await findUser(id); // Assuming findUser is imported or defined in Header.jsx
        console.log(user);
        setUserData(user);
        setTitleShare(user?.name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserD();
  }, []);

  const addSkillHandler = () => {
    const skill = prompt("Enter the skill");
    setUserData((prev) => {
      return {
        ...prev,
        skills: [...prev.skills, skill],
      };
    });

    successToast("Skill added successfully");
    console.log(skill);
  };

  const removeSkillHandler = (skill) => {
    setUserData((prev) => {
      return {
        ...prev,
        skills: prev.skills.filter((s) => s !== skill),
      };
    });
    successToast("Skill removed successfully");
  };

  const addUpdateHandler = () => {
    const interest = prompt("Enter the interest");
    setUserData((prev) => {
      return {
        ...prev,
        interests: [...prev.interests, interest],
      };
    });

    successToast("Interest added successfully");
    console.log(interest);
  };

  const removeInterestHandler = (interest) => {
    setUserData((prev) => {
      return {
        ...prev,
        interests: prev.interests.filter((s) => s !== interest),
      };
    });
    successToast("Interest removed successfully");
  };

  const dataUpdateHandler = async () => {
    console.log(userData);

    const updatedUser = await updateUser(id, userData);

    console.log(updatedUser);
    successToast("Updated Successfully");
  };

  if (!userData) {
    return (
      <div className="flex justify-center items-center text-4xl h-[100svh] font-bold text-cyan-800 animate-pulse">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <div className="relative">
        <div className="fixed top-0 left-0 right-0 h-[60px]">
          <nav className="bg-gradient-to-r from-cyan-600 to-blue-700 p-4 flex justify-between items-center">
            <Link href="/" className="text-white font-mono text-xl">
              Back
            </Link>
            <RWebShare
              data={{
                text: "Recommendo",
                url: `http://localhost:3000/${id}`,
                title: { titleShare },
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <button className="text-white font-mono text-xl">
                Share Profile
              </button>
            </RWebShare>
          </nav>
        </div>
        <div className="flex flex-col justify-center items-center mt-[100px] mb-[60px]">
          <div className="max-w-7xl w-full  border-2 p-12 rounded-md ">
            <div className="flex flex-row mt-8">
              {/* <img
                className="border-2 rounded-full w-auto h-32"
                src="vite.svg"
                alt="Profilephoto"
              /> */}
              <div className="flex flex-col ml-12 mt-4">
                <h1 className="text-2xl font-bold">{userData?.name}</h1>
                <p className="text-gray-600">@{userData?.username}</p>
                <p className="text-gray-600">{userData?.email}</p>
                <p className="mt-2">{userData?.bio}</p>
              </div>
            </div>
            <div className="flex justify-between mt-8 items-center mb-4">
              <h1 className="font-mono text-xl mt-1">Skills</h1>
              <button
                className="bg-cyan-700 text-white px-4 py-2 rounded mt-4 hover:bg-cyan-800 duration-300 ease-in-out transition-all"
                onClick={addSkillHandler}
              >
                <PlusCircle className="h-6 w-6" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {userData?.skills.length === 0 && (
                <div className="text-red-500 font-mono">
                  No skills added yet
                </div>
              )}
              {userData?.skills.map((skill, index) => (
                <div
                  key={index}
                  className="border-2 border-black px-4 rounded-md p-2 w-full flex justify-between items-start"
                >
                  {skill}
                  <button onClick={() => removeSkillHandler(skill)}>
                    <Trash className="w-6 h-6 cursor-pointer" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-8 items-center mb-4">
              <h1 className="text-xl font-mono mt-1">Interests</h1>
              <button
                className="bg-cyan-700 text-white px-4 py-2 rounded mt-4 hover:bg-cyan-800 duration-300 ease-in-out transition-all"
                onClick={addUpdateHandler}
              >
                <PlusCircle className="h-6 w-6" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {userData?.interests.length === 0 && (
                <div className="text-red-500 font-mono">
                  No interests added yet
                </div>
              )}
              {userData?.interests.map((interest, index) => (
                <div
                  key={index}
                  className="border-2 border-black px-4 rounded-md p-2 w-full flex justify-between items-start"
                >
                  {interest}
                  <button onClick={() => removeInterestHandler(interest)}>
                    <Trash className="w-6 h-6 cursor-pointer" />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={dataUpdateHandler}
              className="bg-cyan-700 text-white px-4 py-2 rounded mt-4 hover:bg-cyan-800 duration-300 ease-in-out transition-all"
            >
              Update
            </button>
            <div className="mt-[6vh]">
              <h1 className="text-xl font-mono mt-2">Recommended activities</h1>
              <div className="flex flex-row mt-4">
                <div className="border-2 mr-4 rounded-md border-slate-200 p-2 w-full">
                  Activity 1
                </div>
                <div className="border-2 mr-4 rounded-md border-slate-200 p-2 w-full">
                  Activity 2
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
