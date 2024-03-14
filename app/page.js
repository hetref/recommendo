"use client";

import Header from "@/components/Header";
import Authentication from "@/components/Authentication";
// import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useEffect, useState } from "react";
import { createUser } from "@/lib/actions/user";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { findAllActivities } from "@/lib/actions/activities";

export default function Home() {
  const [authUser, setAuthUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [authId, setAuthId] = useState();

  // const getActivities = async () => {
  //   try {
  //     const activities = await findAllActivities(); // Assuming findUser is imported or defined in Header.jsx
  //     console.log(activities);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
        setAuthUser(user);
        setIsAuthenticated(true);
        setAuthId(uid);
        console.log(user);
      } else {
        // User is signed out
        // ...
        setIsAuthenticated(false);
        console.log("No User");
      }
    });
  }, []);

  const logout = () => {
    auth.signOut();
  };

  return (
    <>
      <Authentication isUser={isAuthenticated} />
      {isAuthenticated === true && (
        <>
          {/* <div className="flex justify-end h-[60px] bg-cyan-800">
            <Link href={`/${authId}`}>Profile</Link>
          </div> */}
          <div className="h-[60px] mb-[40px]">
            <nav className="bg-gradient-to-r from-cyan-600 to-blue-700 p-4 flex justify-end items-center gap-10">
              <Link
                href={`/${authId}`}
                className="text-white font-mono text-xl border-2 border-white px-4 py-2 rounded-md"
              >
                Profile
              </Link>
              <button
                onClick={logout}
                className="text-white font-mono text-xl border-2 border-white px-4 py-2 rounded-md"
              >
                Logout
              </button>
            </nav>
          </div>

          <Header authUser={authId} />
        </>
      )}

      {/* <button onClick={logout}>Logout</button> */}
    </>
  );
}
