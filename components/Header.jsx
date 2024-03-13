"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { findUser } from "@/lib/actions/user";

export default function Header({ authUser }) {
  console.log(authUser);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchUserD = async () => {
      try {
        const user = await findUser(authUser); // Assuming findUser is imported or defined in Header.jsx
        console.log(user);
        setUserData(user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserD();
  }, []);

  return (
    <>
      {userData?.interests.length === 0 && (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components and dependencies to your app using the cli.
          </AlertDescription>
        </Alert>
      )}
      <h1>Hello</h1>
    </>
  );
}
