"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import { login } from "@/services/login";
import { loginFormControls } from "@/utils";
import { func } from "joi";
import { useRouter } from "next/navigation";
import { useState } from "react";

const initialFormData = {
  email: "",
  password: "",
};

export default function Login() {
  const [formData, setFormData] = useState(initialFormData);

  function isValidForm() {
    return formData &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }

  async function handleLogin(){
    const res = await login(formData);
  }

  const router = useRouter();
  return (
    <>
      {/* <Spinner/> */}
      <div className="bg-white relative mt-16">
        <div className="flex flex-col items-center justify-betweenpt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
          <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
            <div className="w-full mt-20 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
              <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
                <p className="w-full text-4xl font-medium text-center font-serif">
                  Login
                </p>
                <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                  {" "}
                  {loginFormControls.map((controlItem) =>
                    controlItem.componentType === "input" ? (
                      <InputComponent
                        key={controlItem.label}
                        type={controlItem.type}
                        placeholder={controlItem.placeholder}
                        label={controlItem.label}
                        value={formData[controlItem.id]}
                        onChange={(event) => {
                          setFormData({
                            ...formData,
                            [controlItem.id]: event.target.value,
                          });
                        }}
                      />
                    ) : null
                  )}
                </div>
                <button
                  className="disabled:opacity-50 inline-flex w-full h-16 items-center justify-center bg-black px-6 py-4 mt-6 teaxt-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                  disabled={!isValidForm()}
                  onClick={handleLogin}
                >
                  Login
                </button>
                <div className="flex flex-col gap-2 w-full">
                  <p className="mt-8">New to Website?</p>
                  <button
                    className="inline-flex w-full h-16 items-center justify-center bg-black px-6 py-4 text-lg 
                     text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                     "
                    onClick={() => router.push("/register")}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
