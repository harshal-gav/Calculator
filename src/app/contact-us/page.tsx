"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill out all fields.");
      return;
    }

    setStatus("submitting");
    try {
      await addDoc(collection(db, "contacts"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        createdAt: serverTimestamp(),
      });
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm border mt-8 mb-16">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-4">
        Contact Us
      </h1>
      <p className="mb-6 text-gray-700 leading-relaxed">
        Have a question, feedback, or a suggestion for a new calculator? We'd
        love to hear from you. Fill out the form below and we'll get back to you
        as soon as possible.
      </p>

      {status === "success" && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-800 rounded-md p-4 flex items-start">
          <svg
            className="h-5 w-5 text-green-400 mr-2 mt-0.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <h3 className="text-sm font-medium">Message sent successfully</h3>
            <div className="mt-1 text-sm">
              <p>Thank you for reaching out! We've received your message.</p>
            </div>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
          <p className="text-sm font-medium">
            There was an error sending your message. Please try again later.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            disabled={status === "submitting"}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            disabled={status === "submitting"}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
            required
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            disabled={status === "submitting"}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className={`w-full text-white font-medium py-2.5 px-4 rounded-md transition-colors ${status === "submitting" ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-sm"}`}
        >
          {status === "submitting" ? "Sending..." : "Send Message"}
        </button>
      </form>

      <div className="mt-10 pt-8 border-t border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Other ways to reach us
        </h2>
        <div className="flex items-center text-gray-600">
          <svg
            className="w-5 h-5 mr-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <p>
            Email:{" "}
            <a
              href="mailto:harshal.cloud.aws@gmail.com"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              harshal.cloud.aws@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
