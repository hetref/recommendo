"use client";

import { createUser } from "@/lib/actions/user";
import { useState } from "react";

export default function Header() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const saveData = async () => {
    const newUser = await createUser({ name, email });

    console.log(newUser);
  };

  return (
    <>
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
      <button onClick={saveData}>Save Data</button>
    </>
  );
}
