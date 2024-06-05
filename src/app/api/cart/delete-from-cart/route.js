import connectToDB from "@/database";
import authUser from "@/middleware/authUser";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectToDB();
    const isAuthUser = await authUser(req);

    if (isAuthUser) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      if (!id) {
        return NextResponse.json({
          success: false,
          message: "Cart Item ID is required",
        });
      }

      const deleteCartItem = await Cart.findByIdAndDelete(id);

      if (deleteCartItem) {
        return NextResponse.json({
          success: true,
          message: "Cart Item deleted successfully",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to delete cart item ! Please try again later",
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
