import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("id");
    if (!productId) {
      return NextResponse.json({
        success: false,
        message: "Product id is required",
      }, { status: 400 });
    }

    const data = await Product.find({ _id: productId });

    if (data && data.length) {
      return NextResponse.json({
        success: true,
        data,
      }, { status: 200 });
    } else {
      return NextResponse.json({
        success: false,
        message: "No Product Found !!",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
