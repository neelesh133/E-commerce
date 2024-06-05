import connectToDB from "@/database";
import authUser from "@/middleware/authUser";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectToDB();
    const isAuthUser = await authUser(req);

    if(isAuthUser?.role === "admin"){
    const extractData = await req.json();

    const {
      _id,
      name,
      price,
      description,
      category,
      sizes,
      deliveryInfo,
      onSale,
      priceDrop,
      imageUrl,
    } = extractData;

    const updatedProduct = await Product.findOneAndUpdate(
      {
        _id,
      },
      {
        name,
        price,
        description,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        imageUrl,
      },
      { new: true }
    );

    if (updatedProduct) {
      return NextResponse.json({
        success: true,
        message: "Product updated successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to update the product ! Please try again later",
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
