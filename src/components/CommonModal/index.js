"use client";

import { Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function CommonModal() {
  return (
    <Transition.Root as={Fragment}>
      <Dialog as="div" className={"relative z-10"}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-900"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div></div>
      </Dialog>
    </Transition.Root>
  );
}
