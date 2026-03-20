import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { loginApiV2 } from '@/services/auth.service';

import { Spinner } from '@/components/ui/spinner';
export default function Login() {
    const formRef = useRef<HTMLFormElement>(null);
    const { checkAuth } = useAuth();

    const mutation = useMutation({
        mutationFn: loginApiV2,
        onSuccess: data => {
            console.log('Logged in', data);
            return data;
        },
        onError: error => {
            console.log('Login failed', error);
            return error;
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // prevent default submission

        if (formRef.current?.checkValidity()) {
            // Form is valid, do your custom logic
            const formData = new FormData(formRef.current);

            await mutation.mutateAsync({
                email: formData.get('email') as string,
                password: formData.get('password') as string,
            });

            await checkAuth(); // hits /auth/profile
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
                <div className={'flex flex-col gap-6'}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Login to your account</CardTitle>
                            <CardDescription>
                                Enter your email below to login to your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form ref={formRef} onSubmit={handleSubmit}>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="email">Email</FieldLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="m@example.com"
                                            required
                                        />
                                    </Field>
                                    <Field>
                                        <div className="flex items-center">
                                            <FieldLabel htmlFor="password">Password</FieldLabel>
                                            <a
                                                href="#"
                                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                            >
                                                Forgot your password?
                                            </a>
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            required
                                        />
                                    </Field>
                                    <Field>
                                        <Button type="submit" disabled={mutation.isPending}>
                                            Login{' '}
                                            {mutation.isPending ? (
                                                <Spinner data-icon="inline-start" />
                                            ) : null}
                                        </Button>
                                        <Button variant="outline" type="button">
                                            Login with Google
                                        </Button>
                                        <FieldDescription className="text-center">
                                            Don&apos;t have an account?{' '}
                                            <a href="/signup">Sign up</a>
                                        </FieldDescription>
                                    </Field>
                                </FieldGroup>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
        // <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        //     <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        //         <img
        //             src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
        //             alt="Your Company"
        //             className="mx-auto h-10 w-auto"
        //         />
        //         <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
        //             Sign in to your account
        //         </h2>
        //     </div>

        //     <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        //         <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        //             <div>
        //                 <label
        //                     htmlFor="email"
        //                     className="block text-sm/6 font-medium text-gray-100"
        //                 >
        //                     Email address
        //                 </label>
        //                 <div className="mt-2">
        //                     <input
        //                         id="email"
        //                         type="email"
        //                         name="email"
        //                         required
        //                         autoComplete="email"
        //                         className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
        //                     />
        //                 </div>
        //             </div>

        //             <div>
        //                 <div className="flex items-center justify-between">
        //                     <label
        //                         htmlFor="password"
        //                         className="block text-sm/6 font-medium text-gray-100"
        //                     >
        //                         Password
        //                     </label>
        //                     <div className="text-sm">
        //                         <a
        //                             href="#"
        //                             className="font-semibold text-indigo-400 hover:text-indigo-300"
        //                         >
        //                             Forgot password?
        //                         </a>
        //                     </div>
        //                 </div>
        //                 <div className="mt-2">
        //                     <input
        //                         id="password"
        //                         type="password"
        //                         name="password"
        //                         required
        //                         autoComplete="current-password"
        //                         className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
        //                     />
        //                 </div>
        //             </div>

        //             <div>
        //                 <button
        //                     type="submit"
        //                     className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        //                 >
        //                     Sign in
        //                 </button>
        //             </div>
        //         </form>

        //         <p className="mt-10 text-center text-sm/6 text-gray-400">
        //             Not a member?{' '}
        //             <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
        //                 Register
        //             </a>
        //         </p>
        //     </div>
        // </div>
    );
}
