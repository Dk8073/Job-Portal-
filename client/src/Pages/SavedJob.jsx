import axios from "axios";
import { useState, useEffect } from "react";
import SavedJobCard from "../components/SavedJobCard";
import { useUser } from "../context/UserContext";

const SavedJob = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [load, setload] = useState(true);

  const { user } = useUser();

  const getSavedJoB = async (userId) => {
    try {
      setload(true);
      const response = await axios.get(
        `http://localhost:8000/api/job/get-saved-job/${userId}`
      );
      setSavedJobs(response.data.saveJobDetails);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    } finally {
      setload(false);
    }
  };

  useEffect(() => {
    getSavedJoB(user._id);
  }, []);

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-blue-700 p-4">
        Saved jobs{" "}
        <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-lg">
          {savedJobs.length}
        </span>
      </h1>
      {load ? (
        <div className="w-full min-h-screen flex items-center justify-center gap-6">
          <span className="w-6 h-6 border-4 border-blue-800 border-t-transparent rounded-full animate-spin"></span>{" "}
          <p className="text-4xl text-blue-800 font-bold">Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 m-4">
          {savedJobs.map((item) => {
            console.log("Job item", item)
            return <SavedJobCard key={item.jobId} jobDetails={item} setSavedJobs={setSavedJobs} />;
          })}
        </div>
      )}
    </>
  );
};

export default SavedJob;
