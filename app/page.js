import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <h1>Hello User</h1>
      <UserButton />
    </>
  );
}
