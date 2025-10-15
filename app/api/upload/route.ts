import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";

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
    // Forward the file to your custom upload server
    const forwardFormData = new FormData();
    forwardFormData.append("file", imageFile);

    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "X-API-Key": apiKey,
      },
      body: forwardFormData,
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: result.error || "File upload failed." },
        { status: response.status }
      );
    }

    // Store the upload information in your database
    await prisma.cloudImage.create({
      data: {
        secure_url: result.url,
        public_id: result.public_id, // Now properly saved from the PHP server response
      },
    });

    // Return the response
    return NextResponse.json(
      {
        message: "Image uploaded successfully!",
        url: result.url,
        public_id: result.public_id,
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