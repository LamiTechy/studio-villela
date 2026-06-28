import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, loading } = useUserStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		login(email, password);
	};

	return (
		<div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
			<motion.div
				className='sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h2 className='text-center text-4xl font-bold text-white font-display tracking-tight'>
					Welcome back
				</h2>
				<p className='mt-2 text-center text-gray-400'>
					Sign in to your account
				</p>
			</motion.div>

			<motion.div
				className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
			>
				<div className='bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 py-8 px-6 shadow-xl shadow-emerald-500/5 sm:rounded-2xl sm:px-10'>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div>
							<label htmlFor='email' className='block text-sm font-medium text-gray-300 mb-1.5'>
								Email address
							</label>
							<div className='relative rounded-xl shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none'>
									<Mail className='h-5 w-5 text-gray-500' aria-hidden='true' />
								</div>
								<input
									id='email'
									type='email'
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='block w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 pl-11 pr-4 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-emerald-500 focus:outline-none transition-colors'
									placeholder='you@example.com'
								/>
							</div>
						</div>

						<div>
							<label htmlFor='password' className='block text-sm font-medium text-gray-300 mb-1.5'>
								Password
							</label>
							<div className='relative rounded-xl shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none'>
									<Lock className='h-5 w-5 text-gray-500' aria-hidden='true' />
								</div>
								<input
									id='password'
									type='password'
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className='block w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 pl-11 pr-4 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-emerald-500 focus:outline-none transition-colors'
									placeholder='••••••••'
								/>
							</div>
						</div>

						<button
							type='submit'
							className='w-full rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-500 hover:to-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2'
							disabled={loading}
						>
							{loading ? (
								<>
									<Loader className='h-5 w-5 animate-spin' aria-hidden='true' />
									Signing in...
								</>
							) : (
								<>
									<LogIn className='h-5 w-5' aria-hidden='true' />
									Sign in
								</>
							)}
						</button>
					</form>

					<p className='mt-8 text-center text-sm text-gray-400'>
						Don't have an account?{" "}
						<Link to='/signup' className='font-semibold text-emerald-400 hover:text-emerald-300 transition-colors'>
							Create one <ArrowRight className='inline h-4 w-4' />
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};
export default LoginPage;