"use client";

import { auth } from "@/firebase/config";
import { createUser } from "@/lib/actions/user";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Link from "next/link";
import React, { useState } from "react";

const Authentication = ({ isUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signupHandler = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        // saveDataIntoMongo({ email, password });
        const newUser = await createUser({
          firebaseId: user.uid,
          name,
          email,
          username,
          bio: "",
          skills: [],
          interests: [],
        });
        console.log(newUser, "newUser");
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginHandler = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const logout = () => {
    auth.signOut();
  };

  const saveDataMongo = async () => {
    const newUser = await createUser({ name, email });
    console.log(newUser, "newUser");
  };

  return (
    <div>
      {isUser === false && (
        <>
          {/* Register */}
          <h1 className="text-2xl">Sign Up</h1>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={signupHandler}>Register</button>
          {/* Login */}
          <h1 className="text-2xl mt-4">LogIn</h1>
          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={loginHandler}>Login</button>
        </>
      )}
      {/* {isUser === true && (
        <>
          <h1>User is Authenticated</h1>
          <Link href="/aryanshinde">Profile</Link>
          <button onClick={logout}>Logout</button>
          <button onClick={saveDataMongo}>Save Data</button>
        </>
      )} */}
    </div>
  );
};

export default Authentication;
