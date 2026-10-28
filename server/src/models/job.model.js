import {Schema, model} from 'mongoose'

const JobSchema = new Schema({
    jobId:{
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    company: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    employmentType: {
        type: String,
        required: true,
        trim: true,
    },
    datePosted: {
        type: String,
        required: true,
        trim: true,
    }
}, {timestamps: true})

export const Job = model("Job", JobSchema);