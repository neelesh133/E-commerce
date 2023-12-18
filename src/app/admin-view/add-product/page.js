"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import TileComponent from "@/components/FormElements/TileComponent";
import Spinner from "@/components/Spinner";
import { GlobalContext } from "@/context";
import { addNewProduct } from "@/services/product";
import {
  AvailableSizes,
  adminAddProductformControls,
  firebaseConfig,
  firebaseStorageUrl,
} from "@/utils";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRouter } from "next/navigation";
import { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStorageUrl);

const helperForUploadingImageToFirebase = (file) => {
  const getFileName = createUniqueFileName(file);
  const storageReference = ref(storage, `e-commerce/${getFileName}`);
  const uploadImage = uploadBytesResumable(storageReference, file);

  return new Promise((resolve, reject) => {
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((downloadUrl) => resolve(downloadUrl))
          .catch((error) => reject(error));
      }
    );
  });
};

const createUniqueFileName = (getFile) => {
  const timeStamp = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);

  return `${getFile.name}-${timeStamp}-${randomStringValue}`;
};

const initialFormData = {
  name: "",
  price: 0,
  description: "",
  category: "men",
  sizes: [],
  deliveryInfo: "",
  onSale: "no",
  imageUrl: "",
  priceDrop: 0,
};

export default function AdminView() {
  const { pageLevelLoader, setPageLevelLoader } = useContext(GlobalContext);
  const [uploadState, setUploadState] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const refImage = useRef(null);
  const router = useRouter();

  const handleImage = async () => {
    // console.log(refImage.current.files);
    try {
      setPageLevelLoader(true);
      const extractImageUrl = await helperForUploadingImageToFirebase(
        refImage.current.files[0]
      );
      // console.log(extractImageUrl);
      if (extractImageUrl !== "") {
        setFormData({
          ...formData,
          imageUrl: extractImageUrl,
        });
        setUploadState(true);
      }
      setPageLevelLoader(false);
      toast.success("Image Uploaded Successfully.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  function handleTileClick(getCurrentItem) {
    let cpySizes = [...formData.sizes];
    const index = cpySizes.findIndex((item) => item.id === getCurrentItem.id);

    if (index === -1) {
      cpySizes.push(getCurrentItem);
    } else {
      cpySizes = cpySizes.filter((item) => item.id !== getCurrentItem.id);
    }

    setFormData({
      ...formData,
      sizes: cpySizes,
    });
  }

  const handleAddProduct = async () => {
    setPageLevelLoader(true);
    const res = await addNewProduct(formData);
    setPageLevelLoader(false);
    setUploadState(false);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    setFormData(initialFormData);
    setTimeout(()=>{
      router.push('/admin-view/all-products');
    },1500)

    // console.log(res);
  };

  return (
    <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
      <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
        <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
          <input type="file" accept="image/*" max="1000000" ref={refImage} />
          <button
            onClick={handleImage}
            className={`h-10 w-48 ${
              uploadState ? `bg-slate-800` : `bg-black`
            } text-md text-white font-medium rounded-md`}
            disabled={uploadState}
          >
            {!uploadState ? (
              pageLevelLoader ? (
                <Spinner text="Uploading" />
              ) : (
                "Upload"
              )
            ) : (
              `Uploaded`
            )}
          </button>
          <div className="flex gap-2 flex-col">
            <label htmlFor="">Available Sizes</label>
            <TileComponent
              selected={formData.sizes}
              data={AvailableSizes}
              onClick={handleTileClick}
            />
            {adminAddProductformControls.map((controlItem) =>
              controlItem.componentType === "input" ? (
                <InputComponent
                  type={controlItem.type}
                  placeholder={controlItem.placeholder}
                  label={controlItem.label}
                  key={controlItem.id}
                  value={formData[controlItem.id]}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      [controlItem.id]: event.target.value,
                    });
                  }}
                />
              ) : controlItem.componentType === "select" ? (
                <SelectComponent
                  label={controlItem.label}
                  options={controlItem.options}
                  value={formData[controlItem.id]}
                  key={controlItem.id}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      [controlItem.id]: event.target.value,
                    });
                  }}
                />
              ) : null
            )}
            <button
              onClick={handleAddProduct}
              className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
            >
              {pageLevelLoader ? (
                <Spinner text="Adding Product" />
              ) : (
                "ADD PRODUCT"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
