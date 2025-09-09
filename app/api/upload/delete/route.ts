import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/prisma/db";

// Configuring Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req: NextRequest) => {
  // Getting the sent image data
  const data = await req.json();
  const imageUrl = data.data.image;

  // Ensure the image URL is valid
  if (!imageUrl || typeof imageUrl !== "string") {
    return NextResponse.json(
      { message: "Invalid image URL!" },
      { status: 400 }
    );
  }

  try {
    // Find the image in the database by secure_url
    const image = await prisma.cloudImage.findUnique({
      where: { secure_url: imageUrl },
    });

    if (!image) {
      return NextResponse.json(
        { message: "Image not found in database!" },
        { status: 404 }
      );
    }

    // Delete the image from Cloudinary using public_id
    await cloudinary.uploader.destroy(image.public_id);

    // Delete the image record from the database
    await prisma.image.delete({
      where: { id: image.id },
    });

    return NextResponse.json(
      { message: "Image deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json(
      { message: "The image could not be deleted!" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};