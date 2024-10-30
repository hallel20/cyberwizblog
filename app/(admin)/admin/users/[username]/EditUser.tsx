"use client";

import Spinner from "@/components/reusable/Spinner";
import { updateUser } from "@/lib/actions";
import { getUser, getUsername } from "@/lib/data";
import { SignUpForm } from "@/lib/formTypes";
import { User } from "@prisma/client";
import debounce from "lodash.debounce";
import { notFound, useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaXmark } from "react-icons/fa6";
import { IoMdCheckmarkCircle } from "react-icons/io";

const EditUser = ({ user }: { user: User }) => {
  const [usernameTaken, setUsernameTaken] = useState<boolean>();
  const [emailTaken, setEmailTaken] = useState<boolean>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const router = useRouter();

  const { handleSubmit, register, watch } = useForm<SignUpForm>({
    defaultValues: {
      username: user.username,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
    },
  });

  const params = useParams();

  const username = params.username as string;

  const formUsername = watch("username");
  const email = watch("email");

  // Define the debounced function to check the database
  const checkUsername = useCallback(
    debounce(async (formUsername: string) => {
      if (formUsername) {
        try {
          const usernameTaken = await getUsername(formUsername);
          if (usernameTaken && formUsername != user.username)
            setUsernameTaken(true);
          else setUsernameTaken(false);
        } catch (error) {
          console.error("Error checking slug:", error);
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
          if (emailTaken && email != user.email) setEmailTaken(true);
          else setEmailTaken(false);
        } catch (error) {
          console.error("Error checking slug:", error);
        }
      }
    }, 2000), // 2-second debounce
    []
  );

  useEffect(() => {
    checkUsername(formUsername);
  }, [formUsername, checkUsername]);

  useEffect(() => {
    checkEmail(email);
  }, [email, checkEmail]);

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          setLoading(true);
          await updateUser(data, user.username);
          router.push("/admin/users");
          setLoading(false);
        } catch (ex) {
          setError("Something went wrong. please try again!");
          setLoading(false);
        }
      })}
    >
      {/* Name */}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="flex gap-3">
        <div className="mb-4 w-6/12">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            {...register("firstname")}
            className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter first name"
            required
          />
        </div>
        <div className="mb-4 w-6/12">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            {...register("lastname")}
            className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter last name"
            required
          />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="mb-4 w-6/12">
          <label
            htmlFor="name"
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
          {/* <input
            type="text"
            id="username"
            {...register("username")}
            className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="@unique"
            required
          /> */}
        </div>
        {/* Email */}
        <div className="mb-4 w-6/12">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
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
          {/* <input
            type="email"
            id="email"
            {...register("email")}
            className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter email"
            required
          /> */}
        </div>
      </div>

      {/* Role */}
      <div className="mb-4">
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700"
        >
          Role
        </label>
        <select
          id="role"
          {...register("role")}
          defaultValue=""
          className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        >
          <option value="" disabled>
            Select role
          </option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      {/* Password */}
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          {...register("password")}
          className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter password"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="newPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="newPassword"
          {...register("newPassword")}
          className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter password"
        />
      </div>

      {/* Confirm Password */}
      <div className="mb-6">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword")}
          className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Re-enter password"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading || emailTaken || usernameTaken}
          className="px-6 py-2 disabled:cursor-not-allowed flex items-center gap-2 disabled:bg-blue-200 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Update {loading && <Spinner />}
        </button>
      </div>
    </form>
  );
};
export default EditUser;
