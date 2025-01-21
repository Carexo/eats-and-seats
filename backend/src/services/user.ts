import { User } from "../models/auth/user/user";

export const getUserByID = async (userID: string) => {
    try {
        const user = await User.findById(userID);

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const isUserPresent = async (userID: string) => {
    try {
        await getUserByID(userID);
        return true;
    } catch (error: any) {
        return false;
    }
};
