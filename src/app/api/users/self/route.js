import connectDB from "@/config/dbConfig";
import User from "@/models/user-model";
import getDataFromToken from "@/utils/getDataFromToken";
import { NextResponse } from "next/server";

connectDB();

export const GET = async (request) => {
  // Get data from token
  try {
    const _id = await getDataFromToken(request);
    const user = await User.findById(_id).select("-password -__v");
    if (!user) {
      NextResponse.json({ message: "User does not exist !" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
};
