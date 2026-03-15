import { Button } from "@/components/ui/button";
import Auth from "@/components/auth/auth";

export default function LoginPage() {
    return (
        <div>
            <h1>Login</h1>
            <Auth type='login' />
        </div>
    );
}