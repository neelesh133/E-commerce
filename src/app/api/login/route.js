import connectToDB from "@/database";
import Joi from "joi";


const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export const dynamic = 'force-dynamic';

export async function POST(req){
    await connectToDB();

    const {email, password} = await req.json();

}