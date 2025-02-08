"use client";
import Button from "@/components/reusable/Button";
import Spinner from "@/components/reusable/Spinner";
import { signUp } from "@/lib/actions";
import { getUser, getUsername } from "@/lib/data";
import { SignUpForm } from "@/lib/formTypes";
import debounce from "lodash.debounce";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaXmark } from "react-icons/fa6";
import { IoMdCheckmarkCircle } from "react-icons/io";

export default function SignUp() {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState<boolean>();
  const [emailTaken, setEmailTaken] = useState<boolean>();

  const { handleSubmit, register, watch } = useForm<SignUpForm>();

  const username = watch("username");
  const email = watch("email");

  // Define the debounced function to check the database
  const checkUsername = useCallback(
    debounce(async (username: string) => {
      if (username) {
        try {
          const usernameTaken = await getUsername(username);
          if (usernameTaken) setUsernameTaken(true);
          else setUsernameTaken(false);
        } catch (error) {
          console.error("Error checking username:", error);
        }
      }
    }, 2000), // 2-second debounce
    []
  );

  const checkEmail = useCallback(
    debounce(async (email: string) => {
      if (username) {
        try {
          const emailTaken = await getUser(email);
          if (emailTaken) setEmailTaken(true);
          else setEmailTaken(false);
        } catch (error) {
          console.error("Error checking email:", error);
        }
      }
    }, 2000), // 2-second debounce
    []
  );

  useEffect(() => {
    checkUsername(username);
  }, [username, checkUsername]);

  useEffect(() => {
    checkEmail(email);
  }, [email, checkEmail]);

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">
          Create an Account
        </h2>
        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              setLoading(true);
              await signUp(data);
              setLoading(false);
              toast.success("Signup successful!")
              router.replace("/auth/login");
            } catch (ex) {
              setLoading(false);
              toast.error("Something went wrong, please try again!");
              setError("Something went wrong, please try again!");
            }
          })}
          className="space-y-3"
        >
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div>
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              {...register("firstname")}
              id="firstname"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              {...register("lastname")}
              id="lastname"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            {usernameTaken && (
              <div className="text-red-500 mb-2">Username is taken!</div>
            )}
            <div
              className={`w-full flex items-center px-4 py-2 border border-gray-300 rounded-lg ring-1 ${
                usernameTaken ? "ring-red-500" : ""
              }`}
            >
              <input
                type="text"
                id="username"
                {...register("username")}
                placeholder="Enter category slug (URL-friendly)"
                className="w-full focus:outline-none"
              />
              <div className="">
                {!usernameTaken ? (
                  <div className="text-green-500">
                    <IoMdCheckmarkCircle size="25" />
                  </div>
                ) : (
                  <div className="text-red-500">
                    <FaXmark size="25" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            {emailTaken && (
              <div className="text-red-500 mb-2">Email is taken!</div>
            )}
            <div
              className={`w-full flex items-center px-4 py-2 border border-gray-300 rounded-lg ring-1 ${
                emailTaken ? "ring-red-500" : ""
              }`}
            >
              <input
                type="text"
                id="email"
                {...register("email")}
                placeholder="Enter category slug (URL-friendly)"
                className="w-full focus:outline-none"
              />
              <div className="">
                {!emailTaken ? (
                  <div className="text-green-500">
                    <IoMdCheckmarkCircle size="25" />
                  </div>
                ) : (
                  <div className="text-red-500">
                    <FaXmark size="25" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              id="password"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              id="confirmPassword"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled={loading}"
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            Sign Up {loading && <Spinner />}
          </Button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
