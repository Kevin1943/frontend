"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Device = () => {
  const router = useRouter();

  useEffect(() => {
    let access_token;
    if (typeof window !== "undefined") {
        access_token = localStorage.getItem("access_token") || "";
      if (access_token) {
        // router.refresh()
      } else {
        router.push('/login')
      }
    }
  }, []);

  let value;
  if (typeof window !== "undefined") {
    value = localStorage.getItem("access_token") || "";
  }
  console.log("userAccessToken 2:", value);
  // Show the user. No loading state is required
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      device
    </div>
  );
};

export default Device;
