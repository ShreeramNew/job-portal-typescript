"use client";
import ReactLoading from "react-loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import loadingWork from "../../public/loadingWork.svg";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(true);

  const CheckAuth = async () => {
    let API = process.env.NEXT_PUBLIC_API + "/api/getProfile/user/checkLogedIn";
    try {
      let response = await axios.get(API, { withCredentials: true });

      if (typeof window !== "undefined") {
        localStorage.setItem("profilePic", response.data.result.profilePic);
        localStorage.setItem("uid", response.data.result.uid);
      }
    } catch (error) {
      if (typeof window !== "undefined") {
        localStorage.getItem("profilePic")
          ? localStorage.removeItem("profilePic")
          : "";
        localStorage.getItem("uid") ? localStorage.removeItem("uid") : "";
      }
    }

    router.push("/main/home");
  };

  useEffect(() => {
    if (!showModal) {
      CheckAuth();
    }
  }, [showModal]);

  return (
    <>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-3">
              Server Wake-up Notice
            </h2>

            <p className="text-sm text-gray-600 mb-4">
              The backend server is hosted on a free cloud tier. If the
              application has been inactive, the first request may take{" "}
              <b>30–60 seconds</b> to wake up.
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              OK, Continue
            </button>
          </div>
        </div>
      )}

      {/* Loading Screen */}
      <div className="w-full h-[100vh] bg-white flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-3 relative w-[200px] h-[200px]">
          <Image
            src={loadingWork}
            alt="loading"
            width={200}
            height={200}
            className="w-[200px] h-[200px] absolute z-[0] bottom-[-1rem] left-0"
          />

          <ReactLoading type="spin" height={20} width={20} color="blue" />
        </div>
      </div>
    </>
  );
}
