import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

const authUser = async (req) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) return false;

  try {
    const extractAuthUserInfo = jwt.verify(
      token,
      "wegdiwegdywyigdwgidiwd62317923"
    );
    if (extractAuthUserInfo) return extractAuthUserInfo;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default authUser;
