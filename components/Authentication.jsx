"use client";

import { auth } from "@/firebase/config";
import { createAdminUser } from "@/lib/actions/admin";
import { createUser } from "@/lib/actions/user";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";

const Authentication = ({ isUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [activeTab, setActiveTab] = useState("register");
  const router = useRouter();
  const adminsignupHandler = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const adminuser = userCredential.user;
        const newadminUser = await createAdminUser({
          firebaseId: adminuser.uid,
          email,
        });
        console.log(newadminUser, "newUser");
        // console.log(newuser);
        //Go to admin page
        redirect("/admin");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const signupHandler = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        // saveDataIntoMongo({ email, password });
        const newAdminUser = await createUser({
          firebaseId: user.uid,
          name,
          email,
          username,
          bio: "",
          skills: [],
          interests: [],
        });
        console.log(newAdminUser, "newUser");
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
        <div className="flex justify-center items-center h-[100svh]">
          {/* Register */}
          {activeTab === "register" && (
            <div className="flex flex-col max-w-[800px] w-full bg-[#e6f3fc] px-[2svw] py-[4svh] md:px-[6svw] md:py-[8svh] rounded">
              <h1 className="text-2xl text-center mb-4 font-bold">Sign Up</h1>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-1"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-1"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {/* <input
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
              /> */}
              <button
                className="bg-cyan-500 text-white px-4 py-2 rounded mt-4 hover:bg-cyan-600 duration-300 ease-in-out transition-all"
                onClick={signupHandler}
              >
                Register
              </button>
              <p className="mt-4">
                Already have an account?{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setActiveTab("login")}
                >
                  Login
                </span>
              </p>

              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setActiveTab("adminregister")}
              >
                Register as Admin
              </span>
            </div>
          )}
          {activeTab === "login" && (
            <div className="flex flex-col max-w-[800px] w-full bg-[#e6f3fc] px-[2svw] py-[4svh] md:px-[6svw] md:py-[8svh] rounded">
              <h1 className="text-2xl text-center mb-4 font-bold">LogIn</h1>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {/* <input
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
              /> */}
              <button
                className="bg-cyan-500 text-white px-4 py-2 rounded mt-4 hover:bg-cyan-600 duration-300 ease-in-out transition-all"
                onClick={loginHandler}
              >
                Login
              </button>
              <p className="mt-4">
                Don't have an account?{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setActiveTab("register")}
                >
                  Register
                </span>
              </p>
            </div>
          )}
          {activeTab === "adminregister" && (
            <div className="flex flex-col max-w-[800px] w-full bg-[#e6f3fc] px-[2svw] py-[4svh] md:px-[6svw] md:py-[8svh] rounded">
              <h1 className="text-2xl text-center mb-4 font-bold">
                Sign Up as Admin
              </h1>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                className="bg-cyan-500 text-white px-4 py-2 rounded mt-4 hover:bg-cyan-600 duration-300 ease-in-out transition-all"
                onClick={adminsignupHandler}
              >
                Register
              </button>
              <p className="mt-4">
                Already have an account?{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setActiveTab("login")}
                >
                  Login
                </span>
              </p>
            </div>
          )}
          {/* Login */}
        </div>
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
