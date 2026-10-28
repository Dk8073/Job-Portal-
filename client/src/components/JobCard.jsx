import axios from "axios";
import toast from 'react-hot-toast'
import { useUser } from "../context/UserContext";


const saveJob = async (userId, id) => {
  console.log(userId)
  try {
    const response = await axios.post(
      `http://localhost:8000/api/job/save-job`,
      {
        userId: userId,
        id: id,
      }
    );
    toast.success("Job added to faviourets", {
      style: {
        border: '1px solid blue',
        padding: '16px',
        color: '#155DFC',
      },
      iconTheme: {
        primary: '#155DFC',
        secondary: '#FFFFFF',
      },
    })
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
  }
};

const JobCard = ({ jobDetails }) => {
  const { user } = useUser();
  console.log(user)
  const {
    _id,
    jobId,
    title,
    company,
    description,
    location,
    employmentType,
    datePosted,
  } = jobDetails;
  const etype = employmentType.split(",");

  return (
    <div className="w-full bg-white rounded-md shadow-lg flex flex-col justify-between gap-2 p-2">

      <div className={`w-full ${jobId % 2 === 0 ? "bg-[#fde1ca]" : "bg-[#d5f6ed]"} shadow-md rounded-2xl flex flex-col p-2 lg:p-4`}>

        <div className="flex flex-row justify-between items-center gap-2">
          <p className="bg-white text-gray-600 text-xs sm:text-sm font-medium rounded-full p-2 lg:px-3 lg:py-2">
            {datePosted}
          </p>
          <span className="bg-white text-blue-700 border border-blue-200 rounded-full text-xs sm:text-sm p-2 lg:px-3 lg:py-2">
            {location}
          </span>
        </div>

        <p className="text-gray-700 text-sm font-medium pt-4">{company}</p>

        <p className="text-xl sm:text-2xl font-semibold text-gray-900 pt-1">
          {title}
        </p>

        <div className="flex flex-wrap justify-between items-center pt-4 gap-2">
          <div className="flex gap-1">
            {etype.map((item, idx) => (
              <span
                key={idx}
                className="bg-green-50 text-green-700 border border-green-200 rounded-full text-xs sm:text-sm px-3 py-1"
              >
                {item.trim()}
              </span>
            ))}
          </div>

          <button
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
            onClick={() => saveJob(user._id, _id)}
          >
            <i className="fa-regular fa-bookmark"></i>
          </button>
        </div>
      </div>
      <div>
        <button className="w-32 px-2 py-2 bg-blue-700 rounded-md text-white font-medium cursor-pointer">
          {" "}
          <span>
            <i className="fa-solid fa-link"></i>
          </span>{" "}
          Apply
        </button>
      </div>
    </div>
  );
};

export default JobCard;
