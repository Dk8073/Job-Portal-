import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `Database Connected! HOST : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Error while connecting with database", error);
    process.exit(1);
  }
};

