import { useState } from "react";
import { useRouter } from "next/router";

const EndInternshipModal = ({ internTest, setEiModal }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    try {
      setLoading(true);

      // Check if intern object has required properties
      if (!intern || !intern.departement || !intern.student || !intern.student._id) {
        console.error("Invalid intern object:", intern);
        setLoading(false); // Reset loading state
        return;
      }

      // Create the request options
      const optionsStd = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          internship: null,
        }),
      };
      const optionsSdprtmnt = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
<<<<<<< HEAD
          internship: null,
=======
          type: "FINISHED",
          finishedInterns: `${internTest._id}`,
>>>>>>> kutay
        }),
      };

      const endPointDprtmnt = `/api/department/${internTest.departement}`;
      const endPointStd = `/api/student/${internTest.student._id}`;

      console.log("Making API requests...");

      await Promise.all([
        fetch(endPointStd, optionsStd),
        fetch(endPointDprtmnt, optionsSdprtmnt),
      ]);

      console.log("API requests completed.");

      // Hide the modal
      setEiModal(false);

      console.log("Redirecting to /Profile/list...");
      // Redirect to the desired page after successful updates
      router.push("/Profile/list");
    } catch (error) {
      console.error("Error while ending internship:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
<<<<<<< HEAD
    <div className="bg-zinc-200 opacity-90 fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="flex-col justify-center bg-[#0B3768] py-12 px-24 border-4 rounded-xl">
          <div className="flex text-lg text-white ml-0 mb-8 py-0 px-0">
            Are you sure you want to{" "}
            <span className="flex mx-2 text-red-500 text-lg font-bold">
              end the internship
            </span>{" "}
            for {intern.student.firstName} {intern.student.lastName}?
          </div>
=======
    <>
      {loading && <LoadingState open={loading} />}
      <div className="bg-zinc-200 opacity-90 fixed inset-0 z-50">
        <div className="flex h-screen justify-center items-center">
          <div className="flex-col justify-center bg-[#0B3768] py-12 px-24 border-4 rounded-xl">
            <div className="flex text-lg text-white ml-0 mb-8 py-0 px-0">
              Are you sure you want to{" "}
              <span className="flex mx-2 text-red-500 text-lg font-bold">
                end the internship
              </span>{" "}
              for {internTest.student.firstName} {internTest.student.lastName}?
            </div>
>>>>>>> kutay

          <div className="flex flex-row ml-32">
            <button
              onClick={(e) => setEiModal(false)}
              className="rounded px-4 py-2 text-white bg-blue-500"
            >
              Cancel
            </button>
            <button
              onClick={handleAccept}
              className={`rounded px-4 py-2 ml-4 text-white bg-red-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndInternshipModal;
