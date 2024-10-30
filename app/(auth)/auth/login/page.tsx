import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import LoginForm from "./LoginForm";

export default async function Login({ searchParams }: any) {
  const session = await getServerSession();

  // If the user is already logged in, redirect them to the dashboard
  if (session) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Log In</h2>
        <LoginForm next={searchParams.next} />
        <p className="mt-4 text-center text-gray-600">
          Don&apos;t have an account? {"  "}
          <Link href="/auth/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
