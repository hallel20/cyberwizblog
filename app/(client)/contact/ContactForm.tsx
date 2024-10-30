"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { contact } from "@/lib/actions";
import Spinner from "@/components/reusable/Spinner";

// Define the Zod schema for validation
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    try {
      await contact(data);
      setSubmitted(true);
      setLoading(false);
    } catch (ex) {
      setError(true);
    }
  };

  return (
    <section className="mt-12 w-full max-w-2xl">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
        Contact Us
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
          {error && (
            <p className="text-red-500 text-sm mt-1">
              Someting went wrong. Please try again!
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            {...register("message")}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 flex space-x-2 items-center justify-center text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Send Message {loading && <Spinner />}
        </button>

        {/* Success Message */}
        {submitted && (
          <p className="text-green-600 text-center mt-4">
            Thank you for your message!
          </p>
        )}
      </form>
    </section>
  );
}
