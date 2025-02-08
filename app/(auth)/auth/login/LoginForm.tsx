"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Button from "@/components/reusable/Button";
import Spinner from "@/components/reusable/Spinner";
import { useState } from "react";
import { signIn, SignInResponse } from "next-auth/react";
import { LoginFormType } from "@/lib/formTypes";
import toast from "react-hot-toast";

const LoginForm = ({ next }: any) => {
  const { handleSubmit, register } = useForm<LoginFormType>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  return (
    <>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            setLoading(true);
            const res = (await signIn("credentials", {
              email: data.email,
              password: data.password,
              redirect: false,
            })) as SignInResponse;
            setLoading(false);
            if (res.ok) {
              toast.success("Login successful! You'll be redirected shortly");
              if (next) {
                router.replace(next);
              } else router.replace("/");
            } else {
              toast.error("Wrong input! Please try again.");
              setError("Wrong Credentials!");
            }
          } catch (ex: any) {
            setLoading(false);
            console.log(ex);
            toast.error(ex.message);
            setError("Something went wrong, please try again!");
          }
        })}
        className="space-y-6"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            id="email"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
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
            id="password"
            {...register("password")}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          Log In {loading && <Spinner />}
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
