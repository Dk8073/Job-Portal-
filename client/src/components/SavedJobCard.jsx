import axios from 'axios'
import { useUser } from '../context/UserContext';
import toast from 'react-hot-toast';

const SavedJobCard = ({ jobDetails, setSavedJobs }) => {

  const { user } = useUser()
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


  const removeJobFromSavedList = async (userId, jobId) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/job/remove-saved-job`, {
        userId,
        jobId
      })
      setSavedJobs(response.data.savedJobs)
      toast.success("Job removed successfully", {
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
  }

  return (
    <div className="w-full bg-white rounded-md shadow-lg flex flex-col gap-2 p-2">
      <div className={`w-full bg-red-300 shadow-md rounded-2xl flex flex-col p-6`}>
        <div className="flex flex-row justify-between items-center">
          <p className="bg-gray-100 text-gray-600 text-xs font-medium rounded-full px-3 py-1">
            {datePosted}
          </p>
          <span className="bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs sm:text-sm px-3 py-1">
            {location}
          </span>
        </div>

        <p className="text-gray-700 text-sm font-medium mt-4">{company}</p>

        <p className="text-xl sm:text-2xl font-semibold text-gray-900 mt-1">
          {title}
        </p>

        <div className="flex flex-wrap justify-between items-center mt-4">
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
        </div>
      </div>
      <div className="flex justify-around gap-4 lg:gap-0">
        <button className="w-40 px-2 py-2 bg-blue-700 rounded-md text-white font-medium cursor-pointer">
          <span>
            <i className="fa-solid fa-link"></i>
          </span> {" "}
          Apply
        </button>

        <button
          className="w-40 px-2 py-2 bg-blue-700 rounded-md text-white font-medium cursor-pointer"
          onClick={() => { removeJobFromSavedList(user._id, _id) }}
        >
          <span>
            <i className="fa-solid fa-trash"></i>
          </span> {" "}
          Remove
        </button>
      </div>
    </div>
  );
};

export default SavedJobCard;
