import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export const POST = async (req: NextRequest) => {
  // Getting the sent image data
  const data = await req.json();
  console.log(data);
  const image = data.data.image;

  // Ensure the image URL is valid and extract the filename
  if (!image || typeof image !== "string") {
    return NextResponse.json("Invalid image data!", { status: 400 });
  }

  // Extract the filename from the image URL
  const filename = image.replace("uploads/", ""); // Remove 'uploads/' from the image path

  try {
    if (process.env.UPLOAD_API_KEY) {
      // Make a DELETE request to the external API
      await axios.post(
        `${process.env.UPLOAD_API}/upload/delete`,
        { filename },
        {
          headers: {
            "x-api-key": process.env.UPLOAD_API_KEY, // Include the API key
          },
        }
      );
    } else {
      console.log("No API key found");
    }

    return NextResponse.json("File Deleted Successfully!", { status: 200 });
  } catch (ex: any) {
    console.log("Something went wrong", ex);
    return NextResponse.json("The Image could not be deleted!", {
      status: 500,
    });
  }
};
