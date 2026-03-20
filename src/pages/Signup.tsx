import { signUpApi } from '@/api/auth.api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useRef, useState } from 'react';

export default function Signup() {
    // const [signupInfo, setSignUpInfo] = useState({
    //     first_name: '',
    //     last_name: '',
    //     password: '',
    //     email: '',
    //     confirmPassword: ''
    // });
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // prevent default submission
        if (!formRef.current) return null;
        const formData = new FormData(formRef.current);

        if (formData.get('password') !== formData.get('confirmPassword')) {
            formRef.current?.reportValidity();
            return;
        }

        if (formRef.current?.checkValidity()) {
            // Form is valid, do your custom logic
            console.log('Form submitted!');

            const signUpData = {
                first_name: formData.get('first_name') as string,
                last_name: formData.get('last_name') as string,
                password: formData.get('password') as string,
                email: formData.get('email') as string,
                // confirmPassword: formData.get('confirmPassword') as string,
            };
            const loginResult = await signUpApi(signUpData);
            console.log({ loginResult });
            // if (isAuthenticated || loginResult?.email) {
            //     navigate('/dashboard', { replace: true });
            // }
        } else {
            // Form invalid, trigger built-in validation messages
            formRef.current?.reportValidity();
        }
    };

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <Card>
                    <CardHeader>
                        <CardTitle>Create an account</CardTitle>
                        <CardDescription>
                            Enter your information below to create your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form ref={formRef} onSubmit={handleSubmit}>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="first_name">First Name</FieldLabel>
                                    <Input
                                        id="first_name"
                                        name="first_name"
                                        type="text"
                                        // value={signupInfo.first_name}
                                        required
                                    />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="last_name">Last Name</FieldLabel>
                                    <Input
                                        id="last_name"
                                        name="last_name"
                                        type="text"
                                        // value={signupInfo.last_name}
                                        required
                                    />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="m@example.com"
                                        // value={signupInfo.email}
                                        required
                                    />
                                    <FieldDescription>
                                        We&apos;ll use this to contact you. We will not share your
                                        email with anyone else.
                                    </FieldDescription>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        // value={signupInfo.password}
                                        required
                                    />
                                    <FieldDescription>
                                        Must be at least 8 characters long.
                                    </FieldDescription>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="confirmPassword">
                                        Confirm Password
                                    </FieldLabel>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        // value={confirmPassword}
                                        required
                                    />
                                    <FieldDescription>
                                        Please confirm your password.
                                    </FieldDescription>
                                </Field>
                                <FieldGroup>
                                    <Field>
                                        <Button type="submit">Create Account</Button>
                                        <Button variant="outline" type="button">
                                            Sign up with Google
                                        </Button>
                                        <FieldDescription className="px-6 text-center">
                                            Already have an account? <a href="/signin">Sign in</a>
                                        </FieldDescription>
                                    </Field>
                                </FieldGroup>
                            </FieldGroup>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
