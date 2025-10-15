import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";

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

  const uploadUrl = process.env.UPLOAD_URL;
  const apiKey = process.env.UPLOAD_API_KEY;

  if (!uploadUrl || !apiKey) {
    console.error("UPLOAD_URL or UPLOAD_API_KEY is not configured on the server.");
    return NextResponse.json(
      { message: "Server configuration error." },
      { status: 500 }
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

    // Delete the image from your custom upload server using public_id
    const response = await fetch(uploadUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify({ public_id: image.public_id }),
    });

    if (!response.ok) {
      const result = await response.json();
      console.error("Delete from server failed:", result);
      return NextResponse.json(
        { message: result.error || "Failed to delete file from server." },
        { status: response.status }
      );
    }

    // Delete the image record from the database
    await prisma.cloudImage.delete({
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