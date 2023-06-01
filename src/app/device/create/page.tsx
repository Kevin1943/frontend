"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Create = () => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const checkbox = useRef<any>({});

  const handleSubmit = async (event: FormEvent) => {
    //Prevent page reload
    event.preventDefault();

    var { deviceName, deviceType, isActive } = document.forms[0];
    const access_token = localStorage.getItem("access_token") || "";
    // TODO: change endpoint default
    let config = {
      method: "post",
      url: "http://localhost:8080/device/create",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      data: {
        deviceName: deviceName.value,
        deviceType: deviceType.value,
        isActive: checkbox.current.checked,
      },
    };
    axios
      .request(config)
      .then((res) => {
        router.push("/device");
      })
      .catch((err) => {
        //
      });
  };

  useEffect(() => {
    let access_token;
    if (typeof window !== "undefined") {
      access_token = localStorage.getItem("access_token") || "";
      if (access_token) {
        setIsLoaded(true);
      } else {
        setIsLoaded(false);
        router.push("/login");
      }
    }
  }, []);

  return (
    isLoaded && (
      <div>
        <div>
          <h2 className="text-2xl font-extrabold dark:text-white text-center">
            Devices
          </h2>
        </div>
        <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  Add Devices
                </h6>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={handleSubmit}>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Device Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Device Name
                      </label>
                      <input
                        name="deviceName"
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Device Type
                      </label>
                      <input
                        name="deviceType"
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <input
                      id="isActive"
                      name="isActive"
                      aria-describedby="isActive"
                      type="checkbox"
                      defaultChecked
                      ref={checkbox}
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                    <label
                      htmlFor="isActive"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      {" "}
                      is device active
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 max-w-sm">
                  <button className="py-2.5 px-6 rounded-lg text-sm font-medium bg-primary-200 text-teal-800" onClick={() => router.push("/device")}>
                    Cancel
                  </button>
                  <button
                    className="py-2.5 px-6 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                    type="submit"
                  >
                    Confirm
                  </button>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Create;
