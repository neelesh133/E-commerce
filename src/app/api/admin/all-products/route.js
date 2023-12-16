import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();

    const user = "admin";
    if (user === "admin") {
        const extractAllProducts = await Product.find({});
        if(extractAllProducts){
            return NextResponse.json({
                success: false,
                data: extractAllProducts,
              });
        }else {
            return NextResponse.json({
              success: false,
              message: "No Products Found."
            },{status:204});
          }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authorized.",
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
