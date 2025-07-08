"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormEvent } from "react";
import Head from "next/head";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    router.push("/profile");
  };
  return (
    <>
      <Head>
        <title>Create Account</title>
      </Head>
      <div className="h-full bg-gray-400 dark:bg-black-300 min-h-screen">
        <div className="mx-auto">
          <div className="flex justify-center px-6 py-12">
            <div className="w-full xl:w-3/4 lg:w-11/12 flex">
              {/* Left Column - Image */}
              <div
                className=" bg-gray-400 dark:bg-gray-800 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                style={{
                  backgroundImage:
                    "url(https://thumbs.dreamstime.com/b/vertical-collage-portrait-mini-black-white-effect-guy-huge-smart-phone-empty-space-dialogue-bubble-isolated-creative-272274759.jpg)",
                }}
              ></div>

              {/* Right Column - Form */}
              <div className="w-full lg:w-7/12 bg-white dark:bg-blue-100 p-5 rounded-lg lg:rounded-l-none">
                <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-black ">
                  Create an Account!
                </h3>
                <form className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded">
                  <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label
                        htmlFor="firstName"
                        className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      >
                        First Name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        placeholder="First Name"
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="md:ml-2">
                      <label
                        htmlFor="lastName"
                        className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      >
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Email"
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        placeholder="******************"
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      />
                      <p className="text-xs italic text-red-500">
                        Please choose a password.
                      </p>
                    </div>
                    <div className="md:ml-2">
                      <label
                        htmlFor="c_password"
                        className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      >
                        Confirm Password
                      </label>
                      <input
                        id="c_password"
                        type="password"
                        placeholder="******************"
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      />
                    </div>
                  </div>

                  <div className="mb-6 text-center">
                    <button
                      type="submit"
                      className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                    >
                      Register
                    </button>
                  </div>

                  <hr className="mb-6 border-t" />

                  <div className="text-center">
                    <a
                      className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                      href="#"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <div className="text-center">
                    <a
                      className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                      href="/login"
                    >
                      Already have an account? Login!
                    </a>
                  </div>
                </form>
              </div>
              {/* End Right Column */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
