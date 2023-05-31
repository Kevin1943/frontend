"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    userId: "",
    email: "",
    isLogin: false,
  });
  useEffect(() => {
    let access_token;
    if (typeof window !== "undefined") {
      access_token = localStorage.getItem("access_token") || "";
      if (access_token) {
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: "http://localhost:8080/auth/profile",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
        axios
          .request(config)
          .then((response) => {
            console.log("a", JSON.stringify(response.data));
            if (response.status === 200 && response.data) {
              setUser(() => ({ ...response.data, isLogin: true }));
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, []);

  function handleLogout(event: React.MouseEvent<HTMLButtonElement>): void {
    localStorage.removeItem("access_token");
    setUser({
      username: "",
      userId: "",
      email: "",
      isLogin: false,
    });
    router.push('/login')
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <ul className="flex flex-row font-medium text-sm">
          <li>
            <Link
              href={"/"}
              className="text-gray-900 dark:text-white hover:underline  mx-6 "
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href={"/device"}
              className="text-gray-900 dark:text-white hover:underline  mx-6 "
            >
              Device
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-900 dark:text-white hover:underline  mx-6 "
            >
              test1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-900 dark:text-white hover:underline mx-6 "
            >
              test2
            </a>
          </li>
        </ul>
        {user.isLogin && (
          <div className="flex items-center">
            <div className="flex flex-row justify-between items-center mx-auto">
              <p>username : {user.username}</p>

              <button
                className="flex items-center mx-6 font-medium text-graydark:text-white hover:underline -500"
                onClick={handleLogout}
              >
                logout
              </button>
            </div>
          </div>
        )}
        {!user?.isLogin && (
          <div className="flex items-center">
            <Link
              href={"/signup"}
              className="mx-6 font-medium text-gray-500 dark:text-white hover:underline "
            >
              Sign up
            </Link>

            <Link
              href={"/login"}
              className="mx-6 font-medium text-graydark:text-white hover:underline -500 "
            >
              Sign in
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
