import { User } from "../models/user.model.js"
import { catchAsync } from "../utils/catchAsync.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

export const uploadAvatar = catchAsync(async(req, res) => {
    const avatarLocalPath = req.file?.path

    if(!avatarLocalPath){
        return res.status(404).json({message: "Avatar File is missing"})
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if(!avatar.url){
        return res.status(404).json({message: "Error while uploading avatar"})
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                avatar: avatar.url
            }
        },
        {new: true}
    ).select("-password")

    return res.status(200).json({message: "Avatar successfully uploded", user})
})

