
# CyberWiz Blog

A modern, full-featured blogging platform built with Next.js, Prisma, and Tailwind CSS.

## Features

### General
- ⚡ Fast, responsive, and mobile-friendly UI
- 🏷️ SEO-friendly with clean URLs
- 🌙 Dark mode support (if implemented)
- 🖼️ Image upload and management
- 🔍 Full-text search for posts
- 🏷️ Tag and category system
- 📄 Privacy Policy and About Us pages

### Authentication & Authorization
- 🔐 User authentication (login/signup) with NextAuth.js
- 🛡️ Role-based access (admin, client, etc.)
- 👤 User profile management

### Admin Dashboard
- 📊 Admin dashboard for managing posts, categories, users, comments, and messages
- ✏️ Create, edit, and delete blog posts
- 🖼️ Upload and manage featured images for posts
- 🗂️ Manage categories and tags
- 🗑️ Delete users, posts, comments, and messages
- 📝 Edit user details and roles
- 👀 Preview posts before publishing
- 📦 Pagination for posts, users, comments, and categories

### Blogging
- 📝 Markdown editor for writing and editing posts
- 🏷️ Add tags and categories to posts
- 🖼️ Add featured images to posts
- 💬 Comment system for posts
- 🗃️ List posts by category or tag
- 🔄 Draft and publish status for posts

### User Experience
- 🏠 Home page with post slider and category bar
- 🔎 Search bar for quick post lookup
- 📬 Contact form for user messages
- 🖼️ User avatars (with default fallback)
- 🧭 Navigation bar and footer
- 🌀 Loading spinners and modals for feedback

### Technology Stack
- Next.js (App Router)
- React & TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL (or other supported DB)
- NextAuth.js for authentication
- React Hook Form for forms
- React SimpleMDE for markdown editing

---

## Getting Started

1. Clone the repo
2. Install dependencies with `pnpm install`
3. Set up your `.env` file (see `.env.example` if available)
4. Run database migrations with `npx prisma migrate dev`
5. Start the dev server with `pnpm dev`

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE)

