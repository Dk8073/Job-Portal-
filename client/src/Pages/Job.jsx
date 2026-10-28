import axios from "axios";
import { useEffect, useState } from "react";
import JobCard from "../components/JobCard.jsx";

const Job = () => {
  // const [res, setRes] = useState({});
  const [jobs, setJobs] = useState([]);
  const [filterJob, setFilterJob] = useState([]);
  const [globalFilterJob, setGlobalFilterJob] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [loaded, setLoaded] = useState(true);


  // const fetchAllJobs = async (page, limit) => {
  //   try {
  //     setLoaded(true)
  //     const response = await axios.get(`http://localhost:8000/api/job/fetch-all-jobs?page=${page}&limit=${limit}`)
  //     setRes(response.data)
  //     setJobs(response.data.jobs);
  //     setFilterJob(response.data.jobs);
  //   } catch (error) {
  //     console.log(error)
  //   } finally {
  //     setLoaded(false)
  //   }
  // };


  const getAllJobs = async () => {
    try {
      setLoaded(true)
      const response = await axios.get(
        `http://localhost:8000/api/job/get-all-jobs`
      );
      setJobs(response.data.jobs);
      setFilterJob(response.data.jobs);
      setGlobalFilterJob(response.data.jobs);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    } finally {
      setLoaded(false)
    }
  };

  // const filterJobsByLocation = (location) => {
  //   if (!location || location.trim() === "") {
  //     setFilterJob(jobs);
  //     return;
  //   }
  //   const response = jobs.filter(
  //     (item) => item.location.toLowerCase().trim() == location.toLowerCase().trim()
  //   );
  //   setFilterJob(response);
  // };

  const filterJobsByType = (jobType) => {
    if (!jobType || jobType.trim() === "") {
      setFilterJob(jobs);
      return;
    }
    const response = globalFilterJob.filter((item) =>
      item.employmentType
        .split(",")
        .map((t) => t.trim())
        .includes(jobType)
    );
    setFilterJob(response);
  };

  const filterJobByTitleORLocation = (serachKeyword) => {
    if (!serachKeyword || serachKeyword.trim() === "") {
      setFilterJob(jobs);
      return;
    }
    const result = jobs.filter((item) => item.title.toLowerCase().includes(serachKeyword.trim().toLowerCase()) || item.location.toLowerCase().trim() == serachKeyword.toLowerCase().trim())
    setFilterJob(result)
    setGlobalFilterJob(result)
  }



  useEffect(() => {
    getAllJobs();
    // fetchAllJobs(1, 8)
  }, []);

  return (

    <>

      <div className="bg-white flex flex-col md:flex-row items-center justify-center gap-4 py-4 px-2 sticky top-26 z-50">
        <input
          className="w-full md:w-2/3 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none placeholder:text-blue-900"
          type="text"
          placeholder="Search jobs by title or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
          onClick={() => filterJobByTitleORLocation(search)}
        >
          Search
        </button>

      </div>

      <div className="flex flex-col lg:flex-row gap-6 p-2">
        <aside className="hidden lg:flex flex-col w-1/6 bg-white shadow-md rounded-2xl p-6 h-fit sticky top-48">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl p-6 shadow">
            <p className="text-xl font-semibold">
              Find best jobs with us at Job Finder
            </p>
            <button className="mt-4 px-4 py-2 bg-white text-blue-700 font-medium rounded-lg shadow hover:bg-gray-100 transition">
              Learn more
            </button>
          </div>

          <p className="text-lg font-semibold pt-6">Filters</p>

          <div className="mt-4 flex flex-col gap-4">
            <select
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option hidden>Employment Type</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Remote">Remote</option>
              <option value="Contract">Contract</option>
            </select>

            <button
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
              onClick={() => filterJobsByType(selectedValue)}
            >
              Apply Filter
            </button>
          </div>
        </aside>

        <main className="flex-1">
          {loaded ? (
            <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-4">
              <span className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
              <p className="text-lg font-semibold text-blue-700">Loading...</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">

              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Recommended Jobs{" "}
                <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-lg">
                  {filterJob.length}
                </span>
              </h1>

              <h2>{search}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filterJob.map((item) => (
                  <JobCard key={item.jobId} jobDetails={item} />
                ))}
              </div>

              {/* <div className="flex items-center justify-center gap-6 mt-6">
              <button
                className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition"
                onClick={() =>
                  fetchAllJobs(res.prev.page, res.prev.limit)
                }
              >
                Prev
              </button>
              <p className="text-blue-700 font-semibold text-lg">
                {res.currentPage}
              </p>
              <button
                className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                onClick={() =>
                  fetchAllJobs(res.next.page, res.next.limit)
                }
              >
                Next
              </button>
            </div> */}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Job;
