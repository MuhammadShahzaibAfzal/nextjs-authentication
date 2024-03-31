import connectDB from "@/config/dbConfig";
import User from "@/models/user-model";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    const response = NextResponse.json(
      { message: "User logout successfully!" },
      { status: 200 }
    );
    response.cookies.set("accessToken", "", {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error !" },
      { status: 500 }
    );
  }
};
