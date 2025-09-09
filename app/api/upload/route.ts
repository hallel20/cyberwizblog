import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/prisma/db";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req: NextRequest) => {
  // Getting the sent image
  const formData = await req.formData();
  const imageFile = formData.get("image"); // Assuming the field name is "image"

  if (!imageFile || !(imageFile instanceof File)) {
    return NextResponse.json(
      { message: "Image cannot be empty or invalid!" },
      { status: 400 }
    );
  }

  // Validate file type and size
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];

  if (!ALLOWED_FILE_TYPES.includes(imageFile.type)) {
    return NextResponse.json(
      { message: "Invalid file type. Only JPEG, PNG, and GIF are allowed." },
      { status: 400 }
    );
  }

  if (imageFile.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { message: "File size exceeds the maximum limit of 5MB." },
      { status: 400 }
    );
  }

  try {
    // Get the buffer and convert to data URI
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const base64 = buffer.toString("base64");
    const dataUri = `data:${imageFile.type};base64,${base64}`;

    // Upload to Cloudinary
    const res = await cloudinary.uploader.upload(dataUri);
    prisma.cloudImage.create({
      data: {
        secure_url: res.secure_url,
        public_id: res.public_id,
      },
    });

    // Return the response
    return NextResponse.json(
      {
        message: "Image uploaded successfully!",
        url: res.secure_url,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { message: "The image could not be uploaded!" },
      { status: 500 }
    );
  }
};
