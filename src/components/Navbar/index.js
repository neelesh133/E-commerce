"use client";

import { Fragment } from "react";

const isAdminView = false;
const isAuthUser = true;
const user = {
  role: "admin",
};

export default function Navbar() {
  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center cursor-pointer">
            <span className="slef-center text-2xl font-semibold whitespace-nowrap text-black">
              Ecommercery
            </span>
          </div>
          <div className="flex md:order-2 gap-2">
            {!isAdminView && isAuthUser ? (
              <Fragment>
                <button className="text-black">Account</button>
                <button className="text-black">Cart</button>
              </Fragment>
            ) : null}
            {user?.role === "admin" ? (
              isAdminView ? (
                <button className="text-black">Client View</button>
              ) : (
                <button className="text-black">Admin View</button>
              )
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
}
