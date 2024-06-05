import connectToDB from "@/database";
import authUser from "@/middleware/authUser";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";

const AddToCart = Joi.object({
  userID: Joi.string().required(),
  productID: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();
    const isAuthUser = await authUser(req);

    if (isAuthUser) {
      const data = await req.json();
      const { productID, userID } = data;

      const { error } = AddToCart.validate({
        userID,
        productID,
      });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }
      const isCurrentCartItemAlreadyExists = await Cart.find({
        userID,
        productID,
      });

      if (isCurrentCartItemAlreadyExists) {
        return NextResponse.json({
          success: false,
          message: "This product is already in your cart",
        });
      }

      const saveProductToCart = await Cart.create(date);

      if (saveProductToCart) {
        return NextResponse.json({
          success: true,
          message: "Product added to cart!",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to add product to cart ! Please try again later",
        });
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
  y;
}
