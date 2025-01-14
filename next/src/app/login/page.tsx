'use client'

import React from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data: any) => {
        console.log('Signup Submitted:', data);
        data = {
            username: "admin",
            password: "Aa1234567!",
        }
        try {

            console.log('Signup Submitted:', data);

            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: data.username,
                    password: data.password,
                }),
            });

            if (response.ok) {
                const responseData = await response.json();
                const token = responseData.token;

                if (token) {
                    localStorage.setItem('token', token);
                    alert('Login successful!');
                    console.log('Token saved to localStorage:', token);
                } else {
                    alert('Login failed: No token received.');
                }
            } else {
                const errorData = await response.json();
                alert(`Login failed: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error during signup:', error);
            alert('An error occurred during login. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        id="username"
                        // {...register('username', { required: 'Username is required' })}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        // {...register('password', {
                        //     required: 'Password is required',
                        //     minLength: { value: 6, message: 'Password must be at least 6 characters' },
                        // })}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>
                <div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                        Login
                    </button>
                </div>
                <div className="text-center">
                    <Link href="/signup">
                        <span className="text-blue-500 hover:underline">Create Account</span>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
