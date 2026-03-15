"use client";

import CustomInput from "../CustomInput/CustomInput";
import { Button } from "../ui/button";

type AuthProps = {
  type: "login" | "signup";
};
const Auth = ({ type }: AuthProps) => {
  console.log("Type ", type);
  return (
    <div>
      <CustomInput label="Email" value="" onChange={() => {}} placeholder="Enter your email"/>
      <CustomInput label="Password" value="" onChange={() => {}} placeholder="Enter your Password"/>
        <Button>{ type === 'login' ? 'Continue' : 'Get Started'}</Button>
    </div>
  );
};

export default Auth;
