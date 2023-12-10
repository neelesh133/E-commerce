"use client"

import { GlobalContext } from "@/context";
import { useContext } from "react";

//page
export default function Home() {
  const {isAuthUser} = useContext(GlobalContext);

  // console.log(isAuthUser);
  return (
    <>
      <div className="mb-0 h-full">SHOPPING</div>
    </>
  );
}
