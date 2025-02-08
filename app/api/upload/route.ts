import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";

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

  // Create a new FormData instance to send the image
  const data = new FormData();
  const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
  data.append("image", imageBuffer, imageFile.name);

  try {
    // Forward the request to the external API
    const res = await axios.post(`${process.env.UPLOAD_API!}/upload`, data, {
      headers: {
        "x-api-key": process.env.UPLOAD_API_KEY,
        ...data.getHeaders(), // Include headers from FormData
      },
    });
    // console.log(res.data);

    // Return the response from the external API
    return NextResponse.json(
      {
        message: "Image uploaded successfully!",
        url: res.data.path,
      },
      { status: 200 }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data);
    } else {
      console.error("Unexpected Error:", error);
    }
    return NextResponse.json(
      { message: "The image could not be uploaded!" },
      { status: 500 }
    );
  }
};
