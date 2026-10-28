import { User } from "../models/user.model.js";
import { Job } from "../models/job.model.js";
import {catchAsync} from "../utils/catchAsync.js"

export const createJob = catchAsync( async (req, res) => {
  const {
    jobId,
    title,
    company,
    description,
    location,
    employmentType,
    datePosted,
  } = req.body;

  const newJob = await Job.create({
    jobId,
    title,
    company,
    description,
    location,
    employmentType,
    datePosted,
  });

  if (newJob) {
    return res
      .status(200)
      .json({ message: "Job got created successfully", newJob });
  }
});

export const removeSavedJob = catchAsync( async (req, res) => {
  const { userId, jobId } = req.body;

  let user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const job = await Job.findById(jobId);
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  user.savedJobs = user.savedJobs.filter((id) => id.toString() !== jobId);
  await user.save();
  user = await User.findById(userId).populate("savedJobs");

  return res
    .status(200)
    .json({ message: "Job removed successfully", savedJobs: user.savedJobs });
});

export const saveJob = catchAsync(async (req, res) => {
  const { userId, id } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const job = await Job.findById(id);
  if (!job) {
    return res.status(400).json({ message: "Job not found" });
  }

  if (user.savedJobs.includes(id)) {
    return res.status(400).json({ message: "Job already saved" });
  }

  user.savedJobs.push(id);
  await user.save();

  return res.status(200).json({
    message: "Job saved successfully",
    user: user
  });
});

export const getAllJob = catchAsync(async (req, res) => {
  const jobs = await Job.find({});

  return res.status(200).json({ jobs });
});

export const getSavedJobs = catchAsync( async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId).populate("savedJobs");

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const saveJobDetails = user.savedJobs;
  return res.status(200).json({ saveJobDetails });
});

export const fetchAllJobs = catchAsync( async(req, res) => {
  const result = {}
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 12
  const total = await Job.countDocuments()

  const skip = (page - 1) * limit // startIndex 

  result.totalPages = Math.ceil(total/limit)
  result.currentPage = page
  if(page > 1){
    result.prev = {
      page : page - 1,
      limit : limit
    }
  }
  if(skip + limit < total){
    result.next = {
      page : page + 1,
      limit : limit
    }
  }

  result.jobs = await Job.find().limit(limit).skip(skip).exec()

  return res.status(200).json(result) 
})
