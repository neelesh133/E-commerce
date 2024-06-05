import connectToDB from "@/database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();
    const isAuthUser = await authUser(req);
    if (isAuthUser) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      if (!id) {
        return NextResponse.json({
          success: false,
          message: "Please Login",
        });
      }

      const extractAllCartItems = await Cart.find({ userID: id })
        .populate("userID")
        .populate("productID");
      if (extractAllCartItems) {
        return NextResponse.json({
          success: true,
          data: extractAllCartItems,
        });
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "Cart is empty !",
          },
          { status: 204 }
        );
      }
    } else {
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
