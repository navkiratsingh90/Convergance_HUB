import mongoose from "mongoose";

const ConnectDb = async () => {

		try{
			await mongoose.connect(process.env.MONGODB_URI)

    // process.exit(0);
	} catch (error){
		console.error("error", error);
	}
}

export default ConnectDb