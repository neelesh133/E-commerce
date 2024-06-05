import connectToDB from "@/database";
import authUser from "@/middleware/authUser";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectToDB();
    const isAuthUser = await authUser(req);

    if(isAuthUser?.role === "admin"){
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json({
        success: false,
        message: "Product ID is required",
      });

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (deletedProduct) {
      return NextResponse.json({
        success: true,
        message: "Product deleted successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to delete the product. Please try again later.",
      });
    }
  } else{
    return NextResponse.json({
      success: false,
      message: "You are not authenticated",
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
