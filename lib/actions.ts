"use server"

import prisma from "@/prisma/db"
import { revalidatePath } from "next/cache"
import bcrypt from "bcrypt";
import { CategoryForm } from "@/app/(admin)/admin/categories/NewCategory";
import { getServerSession } from "next-auth";
import { CommentForm, PostFormType, SignUpForm } from "./formTypes";
import { ContactFormData } from "@/app/(client)/contact/ContactForm";
import nodemailer from "nodemailer";
import axios from "axios";


export const createUser = async (data: SignUpForm) => {
    const {username, password, confirmPassword, firstname, email, lastname, role} = data

  try {
    if (password != confirmPassword)
      throw new Error("Password not match!");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await prisma.user.create({
      data: { username, firstname, email, lastname, password: hashedPassword, role },
    });
  } catch (ex) {
    console.log(ex);
    throw new Error("Could not create user!");
  }
};

export const updateUser = async (data: SignUpForm, oldUsername: string) => {
    const {username, password, newPassword, confirmPassword, firstname, email, lastname, role} = data

  try {
    const user = await prisma.user.findUnique({where: {username: oldUsername}})
    if(!user) throw new Error("User does not exist!")
    if (!newPassword || password || confirmPassword) {
      await prisma.user.update({where: {username: oldUsername}, data: {
        username, firstname, email, lastname, role
      }})
    } else {
    if (newPassword != confirmPassword)
      throw new Error("Password not match!");
    const salt = await bcrypt.genSalt(10);
    const correctPassword = await bcrypt.compare(password, user.password)
    if(!correctPassword) throw new Error("Password Incorrect!")
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await prisma.user.update({where: {username},
      data: { username, firstname, email, lastname, password: hashedPassword, role },
    });}
    revalidatePath("/admin/users")
  } catch (ex) {
    console.log(ex);
    throw new Error("Could not create user!");
  }
};

export const deleteUser = async(id: number) => {
  try {
    await prisma.user.delete({where: {id}})
    revalidatePath("admin/users")
  } catch (ex) {
    console.log(ex)
    throw new Error("Failed to delete user!")
  }
} 


export const signUp = async (data: SignUpForm) => {
    const { username, firstname, lastname, email, password, confirmPassword } =
    data;
    
    try {
        if (password != confirmPassword) throw new Error("Password not match!");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: {
        username,
        firstname,
        lastname,
        email,
        password: hashedPassword,
    },
});
} catch (err) {
    console.log(err);
    throw new Error("Something went wrong, please try again!");
}
};

export const createCategory = async(data: CategoryForm) => {
  const {name, description, slug, image} = data
    console.log(description)
    try {
    await prisma.category.create({data: {
        name, slug, description, image
     }})
     revalidatePath("admin/categories")
    }
    catch (ex) {
        console.log(ex)
        throw new Error("Failed to create Category")
    }
} 

export const updateCategory = async(formData: FormData) => {
    const id = parseInt(formData.get('id') as string)
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const slug = formData.get("slug") as string
    const image = formData.get("image") as string
    console.log(description)
    try {
    const category = await prisma.category.findUnique({where: {id}})
    if (!category) {
        throw new Error("Category does not exist!")
    }
    await prisma.category.update({where: {id}, data: {id, name, slug, description, image}})
    revalidatePath("admin/categories")
  }
  catch (ex) {
    console.log(ex)
    throw new Error("Failed to update Category")
    }
  } 

export const deleteCategory = async (id: number) => {
  try {
    await prisma.category.delete({where: {id}})
    revalidatePath("admin/categories")
  } catch(ex) {
    console.log(ex)
  }
}


export const createPost = async(data: PostFormType) => {
  const {title, slug, status, content, tags, image, categoryId} = data
  const session = await getServerSession()
  try {
    if(!session?.user?.email) throw new Error("Not Authenticated!")

    const email = session.user.email

    if(!slug) throw new Error("Slug is required!")

    const user = await prisma.user.findUnique({where: {email}})

    if(!user) throw new Error("Bad Request!")
    await prisma.post.create({data: {
      title, content, userId: user!.id, slug, tags, categoryId: parseInt(categoryId), status, images: {create: [{url: image}]}
     }})
     revalidatePath("admin/posts")
    }
    catch (ex) {
        console.log(ex)
        throw new Error("Failed to create Post")
    }
} 

export const updatePost = async(data: PostFormType, id: number) => {
  const {title, status, content, tags, image, categoryId} = data
  const session = await getServerSession()
  try {
    if(!session?.user?.email) throw new Error("Not Authenticated!")

    const email = session.user.email

    const user = await prisma.user.findUnique({where: {email}})

    if(!user) throw new Error("Bad Request!")

    if(user.role != "admin") throw new Error("Not Authorized!")
    await prisma.post.update({where: {id}, data: {
      title, content, userId: user!.id, tags, categoryId: parseInt(categoryId), status, images: {create: [{url: image}]}
     }})
     revalidatePath("admin/posts")
    }
    catch (ex) {
        console.log(ex)
        throw new Error("Failed to create Post")
    }
} 


export const deletePost = async(id: number) => {
  try {
    await prisma.post.delete({where: {id}})
    revalidatePath("admin/posts")
  } catch (ex) {
    console.log(ex)
    throw new Error("Failed to delete post!")
  }
} 

export const deleteComment = async(id: number) => {
  try {
    await prisma.comment.delete({where: {id}})
    revalidatePath("admin/comments")
  } catch (ex) {
    console.log(ex)
    throw new Error("Failed to delete post!")
  }
} 


export const approveComment = async (formData: FormData) => {
  const id = parseInt(formData.get("id") as string)
  try {
    await prisma.comment.update({where: {id}, data: {status: "approved"}})
    revalidatePath("admin/comments")
  } catch(ex) {
    console.log(ex)
  }
}

export const rejectComment = async (formData: FormData) => {
  const id = parseInt(formData.get("id") as string)
  try {
    await prisma.comment.update({where: {id}, data: {status: "rejected"}})
    revalidatePath("admin/comments")
  } catch(ex) {
    console.log(ex)
  }
}

export const newComment = async(data: CommentForm) => {
  const {comment, postId, slug} = data
  try {
    const session = await getServerSession()
    if(!session) throw new Error("Not Authenticated!")
    const email = session.user.email
    const user = await prisma.user.findUnique({where: {email}})
    if(!user) throw new Error("Bad Request!")
      await prisma.comment.create({data: {content: comment, userId: user.id, postId: parseInt(postId)}})
    revalidatePath(`/posts/${slug}`)
    revalidatePath("admin/comments")
  } catch(ex) {
    console.log(ex)
  }
  
}

export const contact = async(data: ContactFormData) => {
  const {name, email, message} = data

  try {
    await prisma.contact.create({data: {name, email, message}})
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send mail
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: "hallelojowuro@gmail.com",
      subject: "Contact Form (Cyberwizdev Blog)",
      text: message,
      replyTo: email,
    });
  } catch(ex) {
    console.log(ex)
  }
}

export const deleteMessage = async(id: number) => {
  try {
    await prisma.contact.delete({where: {id}})
    revalidatePath("admin/messages")
  } catch (ex) {
    console.log(ex)
    throw new Error("Failed to delete message!")
  }
}

export const deleteImage = async (imagePath: string) => {
  console.log(imagePath);
  const image = imagePath

  // Ensure the image URL is valid and extract the filename
  if (!image || typeof image !== "string") {
    return false
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

    return true;
  } catch (ex: any) {
    console.log("Something went wrong", ex);
    return false
  }
}