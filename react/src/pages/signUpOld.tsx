import { useForm } from 'react-hook-form';

const Signup = () => {
    const {
        register,
        handleSubmit,
        watch,
        // formState: { errors },
    } = useForm();

    const password = watch('password', '');

    const onSubmit = async () => {

    };


    const handleTest = async () => {
        try {
            const res = await fetch('https://v86g98hnxc.execute-api.us-east-1.amazonaws.com/prod/test', {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            console.log("lol test", res)
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await res.json();
            console.log('Test endpoint result:', result);
            alert(`Response from test endpoint: ${JSON.stringify(result)}`);
        } catch (error) {
            console.error('Error during test:', error);
            alert('An error occurred while testing the endpoint.');
        }
    };

    const handleAddUser = async () => {
        try {

            const data = {
                "username": "testUser1",
                "password": "Aa1234567!"
            }

            const response = await fetch('https://v86g98hnxc.execute-api.us-east-1.amazonaws.com/prod/signup', {
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
                alert('added successful!');
            } else {
                const errorData = await response.json();
                alert(`Signup failed: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error during signup:', error);
            alert('An error occurred during signup. Please try again.');
        }
    }


    const handleLogin = async () => {
        try {
            const data = {
                "username": "admin",
                "password": "Aa1234567!"
            }

            const response = await fetch('https://v86g98hnxc.execute-api.us-east-1.amazonaws.com/prod/login', {
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
                const result = await response.json();
                localStorage.setItem('token', result.token);
                console.log('Login endpoint result:', result);
                alert(`Response from login endpoint: ${JSON.stringify(result)}`);
            } else {
                const errorData = await response.json();
                alert(`Login failed: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login. Please try again.');
        }
    }

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Signup</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        id="username"
                        {...register('username', { required: 'Username is required' })}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {/* {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>} */}
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: { value: 6, message: 'Password must be at least 6 characters' },
                        })}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {/* {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>} */}
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        {...register('confirmPassword', {
                            required: 'Please confirm your password',
                            validate: (value) => value === password || 'Passwords do not match',
                        })}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {/* {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>} */}
                </div>
                <div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                        Signup
                    </button>
                </div>
            </form>
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={handleTest}>
                test
            </button>
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={handleAddUser}>
                add User
            </button>
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={handleLogin}>
                login ( get token )
            </button>
        </div>
    );
};

export default Signup;
