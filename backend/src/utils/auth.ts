import { JwtPayload, sign, verify } from "jsonwebtoken";
import config from "../config";
import { UserJwtPayload } from "../models/auth/user/user.types";

export const newAccessToken = (user: UserJwtPayload) => {
    return sign({ user }, config.secrets.jwt, {
        expiresIn: config.secrets.accessJwtExp,
    });
};

export const newRefreshToken = (user: UserJwtPayload) => {
    return sign({ user }, config.secrets.jwt, {
        expiresIn: config.secrets.refreshJwtExp,
    });
};

export const verifyToken = (token: string): Promise<JwtPayload & { user: UserJwtPayload }> => {
    return new Promise((resolve, reject) => {
        verify(token, config.secrets.jwt, (err, payload) => {
            if (err) return reject(err);
            resolve(payload as JwtPayload & { user: UserJwtPayload });
        });
    });
};
