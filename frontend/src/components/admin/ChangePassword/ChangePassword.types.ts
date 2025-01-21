export interface ChangePasswordPayload {
    email: string;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}