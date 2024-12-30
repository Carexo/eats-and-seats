import { IUser } from "../models/auth/user/user.types";
import { User } from "../models/auth/user/user";

export const createUser = async (userData: IUser) => {
    try {
        return await User.create({ ...userData });
    } catch (error) {
        throw new Error("Can't create user");
    }
};

export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }

    const isValid = await user.isValidPassword(password);

    if (!isValid) {
        throw new Error("User credential is not valid");
    }

    return user;
};
