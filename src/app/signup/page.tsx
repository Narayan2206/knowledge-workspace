import { Button } from "@/components/ui/button";

export default function SignUpPage() {
    return (
        <div>
            <h1>Sign Up</h1>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" placeholder="enter email"/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" placeholder="enter password"/>
            <Button>Get Started</Button>
        </div>
    );
}