import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";


export async function GET(req){
    try {
        await connectToDB();
        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id');
        const data = await Product.find({category : id})

        if(data){
            return NextResponse.json({
                success: true,
                data : data,
              });
        }
        else{
            return NextResponse.json({
                success: true,
                message: "No Products Found !",
              }, { status: 204 })
        }
    } catch (error) {
        console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
    }
}