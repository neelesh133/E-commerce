import connectToDB from "@/database";
import Joi from "joi";

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required()
})

export const dynamic = 'force-dynamic';

export async function POST(req){
    await connectToDB();

    const {name, email, password, role} = await req.json();

    //validate the schema
    const {error} = schema.validate({name,email,password,role})
}