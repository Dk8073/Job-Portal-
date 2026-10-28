import { useUser } from "../context/UserContext";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Account = () => {
  const { user, setUser, loading, setLoading, isLogIn, setIsLogIn } = useUser();

  // console.log("User ", user);
  const dt_txt = user.createdAt;
  const date = dt_txt.split("T")[0];

  const [file, setFile] = useState(user?.avatar || null);
  const [preview, setPreview] = useState(user?.avatar || null);

  const handleAvatarChange = (e) => {
    // console.log(e.target.files);
    const selected = e.target.files[0];
    console.log("selected", selected);
    setFile(selected);
    if (selected) {
      setPreview(URL.createObjectURL(selected));
    }
    handleAvatarUpload(selected);
  };

  const handleAvatarUpload = async (file) => {
    if (!file) {
      return alert("Please select a file first!");
    }

    const formData = new FormData();
    formData.append("avatar", file);
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    // console.log("formData",formData.get("avatar"))

    try {
      const res = await axios.post(
        `http://localhost:8000/api/user/upload-avatar`,
        formData,
        {
          withCredentials: true,
        }
      );
      toast.success("Avatar updated successfully");
      console.log(res.data);
    } catch (error) {
      toast.error("Error while updating avatar");
    }
  };

  const handleAddSkills = () => {
    toast((t) => (
      <div>
        <input
          type="text"
          placeholder="Enter Skill"
          className="px-4 py-2 border-1 border-gray-200 rounded-md outline-none"
        />
        <div className="flex justify-around mt-4">
          <button className="px-4 py-1 bg-blue-600 text-white font-mono hover:bg-blue-700 cursor-pointer rounded-md shadow-lg font-medium whitespace-nowrap">
            Submit
          </button>
          <button
            className="px-4 py-1 bg-blue-600 text-white font-mono hover:bg-blue-700 cursor-pointer rounded-md shadow-lg font-medium whitespace-nowrap"
            onClick={() => toast.dismiss(t.id)}
          >
            Dismiss
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="w-full flex flex-col md:flex-row justify-center items-center md:items-start gap-3 px-2 mb-6">
      <div className="max-w-md md:w-fit w-full h-fit flex flex-col items-center gap-3 border-1 border-gray-300 p-4 rounded-md shadow-md relative z-0">
        {preview ? (
          <div className="w-52 h-52 border-2 border-white shadow-md rounded-full overflow-hidden">
            <img
              src={preview}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="border-2 p-4 rounded-full overflow-hidden justify-center items-center">
            <i className="fa-solid fa-user text-6xl"></i>
          </div>
        )}

        <label
          htmlFor="upload-avatar"
          className="p-2 border-2 border-gray-200 bg-white rounded-[50%] shadow-sm absolute top-1/2 left-[70%] md:left-[70%] z-50"
        >
          <i className="inline-block fa-solid fa-camera text-2xl text-blue-600"></i>
          <input
            type="file"
            id="upload-avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </label>

        <div className="flex gap-2 mt-4">
          <label
            htmlFor="upload-resume"
            className="p-2 border-2 border-blue-700 bg-white rounded-[50%] shadow-md"
          >
            <i className="inline-block fa-solid fa-file-arrow-up text-2xl text-blue-600"></i>
            <input
              type="file"
              id="upload-resume"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
          <button
            type="submit"
            onClick={() => handleAvatarUpload(file)}
            className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 cursor-pointer rounded-md shadow-md text-base font-mono font-medium whitespace-nowrap mt-1"
          >
            Upload Resume
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="max-w-md w-full px-4 border-1 border-gray-300 flex flex-col justify-around shadow-md rounded-md">
          <div>
            <p className="text-xl font-medium font-mono">{user.name}</p>
            <p className="text-sm text-gray-600 font-mono">
              <span className="text-gray-800 font-medium">Email:</span>{" "}
              {user.email}
            </p>
            <div className="text-sm text-gray-600 font-mono">
              <span className="text-gray-800 font-medium">Member Since:</span>{" "}
              {date}
            </div>
          </div>

          <button
            type="submit"
            onClick={() => handleAvatarUpload(file)}
            className="w-fit px-4 py-2 bg-blue-600 text-white font-mono hover:bg-blue-700 cursor-pointer rounded-md shadow-md text-base font-medium whitespace-nowrap"
          >
            {" "}
            <i class="fa-solid fa-eye"></i>
            <span className="px-3">View Resume</span>
          </button>
        </div>

        <div className="max-w-md w-full p-4 border-1 border-gray-300 shadow-md rounded-md">
          <p className="text-xl font-mono text-blue-600 pb-6">Bio</p>
          <p className="text-sm font-mono">
            I am a CSE undergrad, looking for SDE roles. Let's connect for
            create a change.
          </p>
          <div className="flex justify-end pt-6">
            <button
              onClick={() => handleAddSkills()}
              className="px-4 py-1 bg-blue-600 text-white font-mono hover:bg-blue-700 cursor-pointer rounded-md shadow-lg font-medium whitespace-nowrap"
            >
              Edit Bio
            </button>
          </div>
        </div>

        <div className="max-w-md w-full p-4 border-1 border-gray-300 shadow-md rounded-md">
          <div className="flex justify-between items-center pb-6">
            <p className="text-xl font-mono text-blue-600">Education</p>
            <div className="flex gap-3">
              <div
                onClick={() => handleAddSkills()}
                className="w-10 h-10 bg-blue-600 text-white font-mono hover:bg-blue-700 cursor-pointer rounded-[50%] shadow-lg font-medium whitespace-nowrap flex items-center justify-center"
              >
                <i className="fa-solid fa-pencil"></i>
              </div>
              <div
                onClick={() => handleAddSkills()}
                className="w-10 h-10 bg-blue-600 text-white font-mono hover:bg-blue-700 cursor-pointer rounded-[50%] shadow-lg font-medium whitespace-nowrap flex items-center justify-center"
              >
                <i className="fa-solid fa-plus"></i>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-lg font-mono font-medium text-gray-800">
              School Of Enginnering
            </p>
            <p className="text-sm font-mono font-medium text-gray-800">
              2026 - 2028
            </p>
          </div>
          <p className="text-sm font-mono text-gray-700 pb-3">
            M.Tech in Information Technology
          </p>

          <div className="flex justify-between items-center">
            <p className="text-lg font-mono font-medium text-gray-800">
              Haldia Institute Of Technology
            </p>
            <p className="text-sm font-mono font-medium text-gray-800">
              2022 - 2026
            </p>
          </div>
          <p className="text-sm font-mono text-gray-700">
            B.Tech in Information Technology
          </p>
        </div>

        <div className="max-w-md w-full p-4 border-1 border-gray-300 shadow-md rounded-md">
         <div className="flex justify-between items-center pb-6">
            <p className="text-xl font-mono text-blue-600">Experience</p>
            <div className="flex gap-3">
              <div
                onClick={() => handleAddSkills()}
                className="w-10 h-10 bg-blue-600 text-white font-mono hover:bg-blue-700 cursor-pointer rounded-[50%] shadow-lg font-medium whitespace-nowrap flex items-center justify-center"
              >
                <i className="fa-solid fa-pencil"></i>
              </div>
              <div
                onClick={() => handleAddSkills()}
                className="w-10 h-10 bg-blue-600 text-white font-mono hover:bg-blue-700 cursor-pointer rounded-[50%] shadow-lg font-medium whitespace-nowrap flex items-center justify-center"
              >
                <i className="fa-solid fa-plus"></i>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-lg font-mono font-medium text-gray-800">
              Alphabate
            </p>
            <p className="text-sm font-mono font-medium text-gray-800">
              2026 - Current
            </p>
          </div>
          <p className="text-sm font-mono text-gray-700 pb-3">
            Software Develpoer I
          </p>

          <div className="flex justify-between items-center">
            <p className="text-lg font-mono font-medium text-gray-800">
              Capsitech IT Services
            </p>
            <p className="text-sm font-mono font-medium text-gray-800">
              2025 - 2026
            </p>
          </div>
          <p className="text-sm font-mono text-gray-700">
            Full Stack Developer Intern
          </p>
        </div>

        <div className="max-w-md w-full p-4 border-1 border-gray-300 shadow-md rounded-md">
         <div className="flex justify-between items-center pb-6">
            <p className="text-xl font-mono text-blue-600">Projects</p>
            <div className="flex gap-3">
              <div
                onClick={() => handleAddSkills()}
                className="w-10 h-10 bg-blue-600 text-white font-mono hover:bg-blue-700 cursor-pointer rounded-[50%] shadow-lg font-medium whitespace-nowrap flex items-center justify-center"
              >
                <i className="fa-solid fa-pencil"></i>
              </div>
              <div
                onClick={() => handleAddSkills()}
                className="w-10 h-10 bg-blue-600 text-white font-mono hover:bg-blue-700 cursor-pointer rounded-[50%] shadow-lg font-medium whitespace-nowrap flex items-center justify-center"
              >
                <i className="fa-solid fa-plus"></i>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-lg font-mono font-medium text-gray-800">
              Chatter
            </p>
            <p className="text-sm font-mono font-medium text-gray-800">
              2026 - Current
            </p>
          </div>
          <p className="text-sm font-mono text-gray-700 pb-3">
            A real time chat application
          </p>

          <div className="flex justify-between items-center">
            <p className="text-lg font-mono font-medium text-gray-800">
              TapNPay
            </p>
            <p className="text-sm font-mono font-medium text-gray-800">
              2025 - 2026
            </p>
          </div>
          <p className="text-sm font-mono text-gray-700">
            An e-wallet application
          </p>
        </div>

        <div className="max-w-md w-full p-4 border-1 border-gray-300 shadow-md rounded-md">
          <p className="text-xl font-mono text-blue-600 pb-3">Skills</p>

          <div className="flex flex-wrap gap-3">
            <p className="px-4 py-1 rounded-md shadow-md w-max text-gray-700">
              React.js
            </p>
            <p className="px-4 py-1 rounded-md shadow-md w-max text-gray-700">
              Express.js
            </p>
            <p className="px-4 py-1 rounded-md shadow-md w-max text-gray-700">
              MongoDB
            </p>
            <p className="px-4 py-1 rounded-md shadow-md w-max text-gray-700">
              Node.js
            </p>
            <p className="px-4 py-1 rounded-md shadow-md w-max text-gray-700">
              JavaScript
            </p>
            <p className="px-4 py-1 rounded-md shadow-md w-max text-gray-700">
              Tailwind CSS
            </p>
            <p className="px-4 py-1 rounded-md shadow-md w-max text-gray-700">
              AWS
            </p>
            <p className="px-4 py-1 rounded-md shadow-md w-max text-gray-700">
              Java
            </p>
            <p className="px-4 py-1 rounded-md shadow-md w-max text-gray-700">
              Next.js
            </p>
            <p className="px-4 py-1 rounded-md shadow-md w-max text-gray-700">
              TypeScript
            </p>
            <button
              onClick={() => handleAddSkills()}
              className="px-4 py-1 bg-blue-600 text-white font-mono hover:bg-blue-700 cursor-pointer rounded-md shadow-lg font-medium whitespace-nowrap"
            >
              + Add Skills{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
