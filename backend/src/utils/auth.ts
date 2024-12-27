import { IUser } from "../models/user/user.types";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import config from "../config";

export const newToken = (user: IUser) => {
    return sign({ userEmail: user.email }, config.secrets.jwt, {
        expiresIn: config.secrets.jwtExp,
    });
};

export const verifyToken = (token: string): Promise<JwtPayload & { userEmail: string }> => {
    return new Promise((resolve, reject) => {
        verify(token, config.secrets.jwt, (err, payload) => {
            if (err) return reject(err);
            resolve(payload as JwtPayload & { userEmail: string });
        });
    });
};
