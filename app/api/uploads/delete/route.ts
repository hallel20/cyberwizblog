import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export const POST = async (req: NextRequest) => {
    // getting the sent image data
  const data = await req.json();
  const image = data.image
  const imageUrl = `/public/${image}`
  const imagePath = path.join(process.cwd(), imageUrl)
    try {
    await fs.unlink(imagePath)
    return NextResponse.json("File Deleted Successfully!", {status: 200})
    } catch(ex) {
        console.log("Something went wrong", ex)
        return NextResponse.json("The Image could not be deleted!", {status: 500 });
    }
}