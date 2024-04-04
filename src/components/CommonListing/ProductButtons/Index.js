"use client";

import Spinner from "@/components/Spinner";
import { GlobalContext } from "@/context";
import { deleteAProduct } from "@/services/product";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

export default function ProductButton({ item }) {

  const[componentLevelLoader,setComponentLevelLoader] = useState(false);
  const router = useRouter();
  async function handleDeleteProduct(item){
    setComponentLevelLoader(true);
    const res = await deleteAProduct(item._id);
    if(res.success){
      toast.success(res.message);
      router.refresh();
    }
    else{
      toast.error(res.message);
    }
    setComponentLevelLoader(false);

  }
  const pathName = usePathname();
  const { setCurrentUpdatedProduct } =
    useContext(GlobalContext);
  const isAdminView = pathName.includes("admin-view");
  return isAdminView ? (
    <>
      <button
        className="mt-1.5 flex h-14 w-full justify-center items-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
        onClick={() => {
          setCurrentUpdatedProduct(item);
          router.push("/admin-view/add-product");
        }}
      >
        Update
      </button>
      <button onClick={() => {handleDeleteProduct(item)}} className="mt-1.5 h-14 flex w-full justify-center items-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
        {(componentLevelLoader) ? <Spinner text="Deleting" /> : "DELETE"}
      </button>
    </>
  ) : (
    <>
      <button className="mt-1.5 h-14 flex w-full justify-center items-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
        Add To Cart
      </button>
    </>
  );
}
