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

type AuthProps = {
  type: "login" | "signup";
};
const Auth = ({ type }: AuthProps) => {
  console.log("Type ", type);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <Card className="w-full max-w-sm bg-gray-200">
      <CardHeader className="justify-center">
        <CardTitle>
          {type === "login" ? "Login to your account" : "Create your account"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <CustomInput
            label="Email"
            value={email}
            onChange={setEmail}
            placeholder="Enter your email"
            type="email"
          />
        </div>
        <div className="mb-4">
          <CustomInput
            label="Password"
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
            type="password"
          />
        </div>
        {type === "login" ? (
          <p>
            New to our application?
            <Button variant={"link"} asChild className="text-blue-800">
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
        <Button className="w-full">
          {type === "login" ? "Continue" : "Get Started"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Auth;
