"use client"

import { GlobalContext } from "@/context";
import { useContext } from "react";

//page
export default function Home() {
  const {isAuthUser} = useContext(GlobalContext);

  console.log(isAuthUser);
  return (
    <>
      <div className="z-10">HEEELOasdasdadad</div>
    </>
  );
}
