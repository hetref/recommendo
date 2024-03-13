"use client";

import Header from "@/components/Header";
import Authentication from "@/components/Authentication";
// import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useEffect, useState } from "react";
import { createUser } from "@/lib/actions/user";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

export default function Home() {
  const [authUser, setAuthUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [authId, setAuthId] = useState();

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
          <Link href={`/${authId}`}>Profile</Link>
          <Header authUser={authId} />
        </>
      )}

      <button onClick={logout}>Logout</button>
    </>
  );
}
