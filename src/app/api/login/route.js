import connectToDB from "@/database";
import User from "@/models/user";
import { compare } from "bcryptjs";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  await connectToDB();

  const { email, password } = await req.json();

  //validate the schema
  const { error } = schema.validate({ email, password });

  if (error) {
    if (error.details[0].type === "string.email") {
      return NextResponse.json({
        success: false,
        message: "Enter a valid email.",
      });
    }
  }

  try {
    // console.log("1")
    const checkUser = await User.findOne({ email });

    // console.log("2")

    if (!checkUser) {
      return NextResponse.json({
        success: false,
        message: "Wrong credentials",
      });
    }
    const checkPassword = await compare(password, checkUser.password);

    if (!checkPassword) {
      return NextResponse.json({
        success: false,
        message: "Wrong credentials",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        email: checkUser?.email,
        role: checkUser?.role,
      },
      "wegdiwegdywyigdwgidiwd62317923",
      { expiresIn: "1d" }
    );

    const finalData = {
      token,
      user: {
        email: checkUser.email,
        name: checkUser.name,
        _id: checkUser._id,
        role: checkUser.role,
      },
    };

    return NextResponse.json({
      success: true,
      message: `Welcome back ${checkUser.name}`,
      finalData,
    });
  } catch (error) {
    console.log("Error in login user");
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try agin later",
    });
  }
}
