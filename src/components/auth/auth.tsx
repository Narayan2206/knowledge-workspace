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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { signInWithEmail, signUpNewUser } from "@/features/auth";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, signupSchema } from "@/schema/auth.schema";
import { z } from "zod";
import { toast } from "sonner";
import { MailCheck } from "lucide-react";
import { getClientSupabase } from "@/lib/supabase/client";

type AuthProps = {
  type: "login" | "signup";
};

type FormValues = z.infer<typeof loginSchema> | z.infer<typeof signupSchema>;

const Auth = ({ type }: AuthProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const schema = type === "login" ? loginSchema : signupSchema;
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      ...(type === "signup" && { name: "" }),
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      let response: any = {};
      if (type === "login") {
        response = await signInWithEmail(data.email, data.password);
        
        if(response?.user?.email_confirmed_at){
          router.replace("/dashboard");
        } else {
          await getClientSupabase().auth.signOut();

          router.replace(
            `/verify-email?email=${encodeURIComponent(
              data.email
            )}`
          );
        }
      } else {
        response = await signUpNewUser(
          data.email,
          data.password,
          "name" in data ? data.name : "",
        );
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error(
        `Some error occurred while ${type === "login" ? "logging" : "signing"} in`,
        error,
      );
      toast.error(
        `Some error occurred while ${type === "login" ? "logging" : "signing"} in`,
        {position: "top-center"}
      );
    }

    setLoading(false);
  };

  if (type === "signup" && isSubmitted) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MailCheck className="text-green-600" /> Check your email
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="default" className="border-green-200 bg-green-50">
            <AlertTitle className="text-green-800">Success!</AlertTitle>
            <AlertDescription className="text-green-700">
              We've sent a confirmation link to your email. Please verify your
              account before logging in.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/login")}
          >
            Back to Login
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader className="justify-center">
          <CardTitle>
            {type === "login" ? "Login to your account" : "Create your account"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {type === "signup" && (
            <div className="mb-4">
              <Controller
                name="name"
                control={form.control}
                render={({ field }) => (
                  <CustomInput
                    label="Name"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Enter your full name"
                    error={
                      "name" in form.formState.errors
                        ? form.formState.errors.name?.message
                        : undefined
                    }
                    type="text"
                    required
                  />
                )}
              />
            </div>
          )}
          <div className="mb-4">
            <Controller
              name="email"
              control={form.control}
              render={({ field }) => (
                <CustomInput
                  label="Email"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Enter your email"
                  error={form.formState.errors.email?.message}
                  type="email"
                  required
                />
              )}
            />
          </div>
          <div className="mb-4">
            <Controller
              name="password"
              control={form.control}
              render={({ field }) => (
                <CustomInput
                  label="Password"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Enter your password"
                  error={form.formState.errors.password?.message}
                  type="password"
                  required
                />
              )}
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
          <Button className="w-full" type="submit" disabled={loading}>
            {type === "login" ? "Continue" : "Get Started"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Auth;
