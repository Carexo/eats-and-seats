import { UserJwtPayload } from "../models/auth/user/user.types";

declare module "express-serve-static-core" {
    interface Request {
        user?: UserJwtPayload;
    }
}
