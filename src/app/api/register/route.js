import connectToDB from "@/database";
import User from "@/models/user";
import { hash } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  await connectToDB();

  const { name, email, password, role } = await req.json();

  //validate the schema
  const { error } = schema.validate({ name, email, password, role });

  if (error) {
    if (error.details[0].type === "string.min") {
      return NextResponse.json({
        success: false,
        message: "Password must be atleast 6 characters.",
      });
    } else if (error.details[0].type === "string.email") {
      return NextResponse.json({
        success: false,
        message: "Enter a valid email.",
      });
    }
  }

  try {
    //Check if user already exists

    const isUserAlreadyExists = await User.findOne({ email });

    if (isUserAlreadyExists) {
      return NextResponse.json({
        success: false,
        message: "User already exists. Please Login",
      });
    } else {
      const hashPassword = await hash(password, 12);
      const newlyCreatedUser = await User.create({
        name,
        email,
        password: hashPassword,
        role,
      });

      if (newlyCreatedUser) {
        return NextResponse.json({
          success: true,
          message: "User registered successfully.",
        });
      }
    }
  } catch (error) {
    console.log("Error in new user registration");
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try agin later",
    });
  }
}
