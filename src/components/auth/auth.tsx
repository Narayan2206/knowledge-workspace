"use client";

import { useState } from "react";
import CustomInput from "../CustomInput/CustomInput";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { signInWithEmail, signUpNewUser } from "@/features/auth";
import { useRouter } from "next/navigation";

type AuthProps = {
  type: "login" | "signup";
};
const Auth = ({ type }: AuthProps) => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if(!email && !password){
      alert('Please enter email and password.');
      return;
    }
    setLoading(true);
    let response:any = {};
    if(type === 'login'){
     response = await signInWithEmail(email, password);
    } else {
     response = await signUpNewUser(email, password, name);
    }

    console.log("RESPONSE ", response);

    if(response.error){
      console.error("Some error occurred while logging in ", response.error);
    }
     else{
      if(type === "login"){
        router.push("/dashboard");
      } else if(type === "signup"){
        alert("Check your email to confirm your account before logging in.");
      }
    }
    setLoading(false);
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="justify-center">
        <CardTitle>
          {type === "login" ? "Login to your account" : "Create your account"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {type === 'signup' && (
          <div className="mb-4">
          <CustomInput
            label="Name"
            value={name}
            onChange={setName}
            placeholder="Enter your full name"
            type="text"
            required
          />
        </div>
        )}
        <div className="mb-4">
          <CustomInput
            label="Email"
            value={email}
            onChange={setEmail}
            placeholder="Enter your email"
            type="email"
            required
          />
        </div>
        <div className="mb-4">
          <CustomInput
            label="Password"
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
            type="password"
            required
          />
        </div>
        {type === "login" ? (
          <p>
            New to our application?
            <Button 
            variant={"link"} 
            asChild 
            className="text-blue-800"
            >
              <Link href="/signup">SignUp</Link>
            </Button>
          </p>
        ) : (
          <p>
            Already have an account?
            <Button variant={"link"} asChild className="text-blue-800">
              <Link href="/login">Login</Link>
            </Button>
          </p>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button 
        className="w-full"
        onClick={handleSubmit}
        disabled={loading}
        >
          {type === "login" ? "Continue" : "Get Started"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Auth;
