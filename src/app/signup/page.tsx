import Auth from "@/components/auth/auth";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
    return (
        <div>
            <h1>Sign Up</h1>
            <Auth type='signup' />
        </div>
    );
}