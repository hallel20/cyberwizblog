"use server"

import prisma from "@/prisma/db"
import { pageSize } from "./global"

export const getCategories = async(page?: string) => {
    try {
        let categories;
        if(page) {
            categories = await prisma.category.findMany({include: {_count: true}, take: pageSize, skip: pageSize * (parseInt(page) - 1)})
        } else {
            categories = await prisma.category.findMany({include: {_count: true}})
        }
    return categories
    }
    catch (ex) {
        console.log(ex)
        // throw new Error("Failed to fetch categories")
    }
} 

export const getCategory = async(slug: string) => {
    try {
    const category = await prisma.category.findUnique({where: {slug}})
    if (!category) throw new Error("Category not found")
    return category
    }
    catch (ex) {
        console.log(ex)
        // throw new Error("Failed to fetch category")
    }
} 

export const postCount = async() => {
    try {
        const count = await prisma.post.count()
        return count
    } catch(ex) {
        console.log(ex)
    }
}

export const categoryCount = async() => {
    try {
        const count = await prisma.category.count()
        return count
    } catch(ex) {
        console.log(ex)
    }
}

export const userCount = async() => {
    try {
        const count = await prisma.user.count()
        return count
    } catch(ex) {
        console.log(ex)
    }
}

export const commentCount = async() => {
    try {
        const count = await prisma.comment.count()
        return count
    } catch(ex) {
        console.log(ex)
    }
}

export const getPosts = async(page: string) => {
    try {
    const posts = await prisma.post.findMany({
        include: {_count: true, user: true, category: {select: {name: true}}, images: true}, 
        take: pageSize, 
        skip: pageSize * (parseInt(page) - 1),
        orderBy: {createdAt: "desc"}
    })
    return posts
    }
    catch (ex) {
        console.log(ex)
        // throw new Error("Failed to fetch posts")
    }
} 

export const getFeaturedPosts = async() => {
    try {
    const posts = await prisma.post.findMany({where: {categoryId: 1}, include: {_count: true, user: true, category: {select: {name: true}}, images: true}})
    return posts
    }
    catch (ex) {
        console.log(ex)
        // throw new Error("Failed to fetch posts")
    }
} 

export const getPopularPosts = async() => {
    try {
    const posts = await prisma.post.findMany({
        include: {_count: true, category: {select: {name: true}}, images: true}, 
        take: 5,
        orderBy: {comments: {_count: "desc"}}
    })
    return posts
    }
    catch (ex) {
        console.log(ex)
        // throw new Error("Failed to fetch posts")
    }
} 


export const getPost = async(slug: string) => {
    try {
    const posts = await prisma.post.findUnique({where: {slug}, include: {comments: {include: {user: {include: {images: true}}}}, category:true, images: true, user: true}})
    return posts
    }
    catch (ex) {
        console.log(ex)
        // throw new Error("Failed to fetch post")
    }
} 

export const getUsers = async(page: string) => {
    try {
    const posts = await prisma.user.findMany({include: {_count: true, images: true}, take: pageSize, skip: pageSize * (parseInt(page) - 1)})
    return posts
    }
    catch (ex) {
        console.log(ex)
        // throw new Error("Failed to fetch posts")
    }
} 


export const getAllComments = async(page: string) => {
    try {
    const posts = await prisma.comment.findMany({include: {user: {include: {images: true}}, post: true}, take: pageSize, skip: pageSize * (parseInt(page) - 1)})
    return posts
    }
    catch (ex) {
        console.log(ex)
        // throw new Error("Failed to fetch posts")
    }
} 


export const getUser = async(email: string) => {
    try {
    const posts = await prisma.user.findUnique({where: {email}, include: { images: true}})
    return posts
    }
    catch (ex) {
        console.log(ex)
        // throw new Error("Failed to fetch post")
    }
} 



export const getUsername = async(username: string) => {
    try {
    const posts = await prisma.user.findUnique({where: {username}, include: { images: true}})
    return posts
    }
    catch (ex) {
        console.log(ex)
        // throw new Error("Failed to fetch post")
    }
} 

export const searchCount = async(query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    try {
        const count = prisma.post.count({
            where: {
              OR: [
                {
                  title: {
                    contains: lowerCaseQuery,
                  },
                },
                {
                  content: {
                    contains: lowerCaseQuery,
                  },
                },
              ],
            },
          });
          return count
    } catch (ex) {
        console.log(ex)
    }
}

export const searchPosts = async(query: string, page: string) => {
    try {
        // Fetch posts where title or content includes the search query
        const lowerCaseQuery = query.toLowerCase();

      const posts = await prisma.post.findMany({
        where: {
          OR: [
            {
              title: {
                contains: lowerCaseQuery,
              },
            },
            {
              content: {
                contains: lowerCaseQuery,
              },
            },
          ],
        },
        include: {_count: true, user: true, category: {select: {name: true}}, images: true}, 
        take: pageSize, 
        skip: pageSize * (parseInt(page) - 1),
        orderBy: {createdAt: "desc"}
      });

      return posts
    }catch(ex) {
        console.log(ex)
    }
}