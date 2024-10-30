import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req: NextRequest) => {
  // getting the sent image
  const formData = await req.formData();
//   console.log(formData)

  const file = formData.get("image") as File;
  if (!file) {
    return NextResponse.json({ error: "Image Cannot be empty!." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + file.name.replaceAll(" ", "_");
  const filePath = `/public/uploads/${filename}`;
  try {
    // connectToDB()
    await writeFile(path.join(process.cwd(), filePath), buffer);
    const imageUrl = `/uploads/${filename}`;
  
    return NextResponse.json(imageUrl, {status: 200})
  } catch (error) {
    console.error("Error occured ", error);
    return NextResponse.json({ Message: "The Image could not be uploaded!"}, {status: 500 });
  }

};
