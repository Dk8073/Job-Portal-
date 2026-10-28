import { Router } from 'express'
import { createJob, fetchAllJobs, getAllJob, getSavedJobs, removeSavedJob, saveJob } from '../controllers/job.controller.js';

const router = Router();

router.post("/create-job", createJob)
router.get("/get-all-jobs", getAllJob)
router.post("/save-job", saveJob)
router.post("/remove-saved-job", removeSavedJob)
router.get("/get-saved-job/:userId", getSavedJobs)
router.get("/fetch-all-jobs", fetchAllJobs)

export default router;