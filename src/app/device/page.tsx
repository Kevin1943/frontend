"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Device = () => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    let access_token;
    if (typeof window !== "undefined") {
      access_token = localStorage.getItem("access_token") || "";
      if (access_token) {
        //

        let config = {
          method: "get",
          url: "http://localhost:8080/device",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };

        axios
          .request(config)
          .then((response) => {
            setDevices(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
        setIsLoaded(true);
      } else {
        setIsLoaded(false);
        router.push("/login");
      }
    }
  }, []);

  function handleDeleteClicked(deviceId: string): void {
    // throw new Error("Function not implemented.");
    if (window.confirm("delete device")) {
      let access_token;
      if (typeof window !== "undefined") {
        access_token = localStorage.getItem("access_token") || "";
        if (access_token) {
          //

          let config = {
            method: "delete",
            url: `http://localhost:8080/device/${deviceId}`,
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          };

          axios
            .request(config)
            .then((response) => {
            })
            .catch((error) => {
              console.error(error);
            });
          setIsLoaded(true);
        } else {
          setIsLoaded(false);
        }
      }
    }
    window.location.reload();  }

  return (
    isLoaded && (
      <div>
        <div>
          <h2 className="text-2xl font-extrabold dark:text-white text-center">
            Devices
          </h2>
        </div>
        <div className="flex-wrap justify-between items-center mx-auto max-w-screen-xl p-16">
          <div className="pb-4">
            <button
              className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
              onClick={() => router.push("/device/create")}
            >
              Add device
            </button>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Device name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Device type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    isActive
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {devices.map((device: any, i) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                    key={i}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {device.deviceName}
                    </th>
                    <td className="px-6 py-4"> {device.deviceType}</td>
                    <td className="px-6 py-4">
                      {" "}
                      {device.isActive ? "Active" : "Not active"}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <button
                          className="bg-yellow-300 text-white font-bold py-2 px-4 rounded"
                          onClick={() =>
                            router.push(`/device/${device._id}`)
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-300 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleDeleteClicked(device._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  );
};

export default Device;
