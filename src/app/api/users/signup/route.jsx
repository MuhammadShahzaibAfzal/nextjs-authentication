import connectDB from "@/config/dbConfig";
import User from "@/models/user-model";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import sendMail from "@/config/mailer";

connectDB();

export const POST = async (request) => {
  const reqBody = await request.json();
  const { firstName, lastName, email, password } = reqBody;
  //   VALIDATION
  if (!firstName || !lastName || !email || !password) {
    return NextResponse.json(
      { message: "Please provide all required fields." },
      { status: 422 }
    );
  }
  try {
    // CHECK USER EXIST ALREADY OR NOT
    const isExist = await User.findOne({ email });
    if (isExist) {
      return NextResponse.json(
        { message: "Email is already exist." },
        { status: 409 }
      );
    }
    // hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    // SAVE INTO DATABASE
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    //TODO: SEND VERIFICATION MAIL TO USER
    await sendMail({ emailType: "VERIFY", userID: user._id });
    return NextResponse.json(
      { user, message: "User created successfully !" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
};
