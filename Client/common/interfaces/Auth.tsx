export interface IAuthSignUp {
  fullName?: string;
  email: string;
  phone: number;
  password: string;
  confirmPassword?: string;
  birthDate: Date;
  gender: string;
}
export interface IAuthSignIn {
  phone: string;
  password: string;
}
