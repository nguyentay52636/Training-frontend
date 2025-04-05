
import { LoginForm } from '@/components/login-form'
export default function LoginPage() {
    return (

        <div className="flex flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full flex justify-center">
                <LoginForm />
            </div>
        </div>
    )
}
