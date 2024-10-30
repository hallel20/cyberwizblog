import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed sample data for the Post schema
  await prisma.post.createMany({
    data: [
      {
        title: "Exploring JavaScript Fundamentals",
        slug: "exploring-javascript-fundamentals",
        content: `# JavaScript Basics\nJavaScript is a versatile language for both front-end and back-end development.`,
        tags: "JavaScript,Programming,Web Development",
        userId: 1, // Replace with actual user ID
        categoryId: 9, // Replace with actual category ID
        status: "published",
        // images: create["https://picsum.photos/300/200"]
      },
      {
        title: "Getting Started with React",
        slug: "getting-started-with-react",
        content: `# React Basics\nReact is a popular JavaScript library for building user interfaces.`,
        tags: "React,Frontend,JavaScript",
        userId: 2, // Replace with actual user ID
        categoryId: 10, // Replace with actual category ID
        status: "published",
      },
      {
        title: "Understanding Async/Await in JavaScript",
        slug: "understanding-async-await",
        content: `# Async/Await\nAsynchronous programming is a key feature of JavaScript.`,
        tags: "JavaScript,Async,Programming",
        userId: 1, // Replace with actual user ID
        categoryId: 9, // Replace with actual category ID
        status: "draft",
      },
    ],
  });

  console.log("Seeded posts data");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
