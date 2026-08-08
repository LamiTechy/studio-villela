import { useState } from "react";
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";
	const { cart } = useCartStore();
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<header className='fixed top-0 left-0 w-full bg-white/80 backdrop-blur-xl shadow-sm z-40 transition-all duration-300 border-b border-pink-100'>
			<div className='container mx-auto px-4 py-3'>
				<div className='flex justify-between items-center'>
					<Link to='/' className='text-2xl font-bold text-pink-600 items-center space-x-2 flex font-display tracking-tight'>
						<span className="bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">Studio Vilella</span>
					</Link>

					{/* Desktop nav */}
					<nav className='hidden md:flex items-center gap-4'>
						<Link
							to={"/"}
							className='text-gray-600 hover:text-pink-600 transition duration-200 ease-in-out font-medium'
						>
							Home
						</Link>
						{user && (
							<Link
								to={"/cart"}
								className='relative group text-gray-600 hover:text-pink-600 transition duration-200 ease-in-out'
							>
								<ShoppingCart className='inline-block mr-1 group-hover:text-pink-600' size={20} />
								<span className='hidden sm:inline'>Cart</span>
								{cart.length > 0 && (
									<span
										className='absolute -top-2 -left-2 bg-pink-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-pink-400 transition-all duration-200 animate-scale-in'
									>
										{cart.length}
									</span>
								)}
							</Link>
						)}
						{isAdmin && (
							<Link
								className='bg-pink-600 hover:bg-pink-500 text-white px-3 py-1.5 rounded-lg font-medium transition-all duration-200 flex items-center text-sm'
								to={"/secret-dashboard"}
							>
								<Lock className='inline-block mr-1' size={16} />
								<span>Dashboard</span>
							</Link>
						)}

						{user ? (
							<button
								className='bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg flex items-center transition-all duration-200 border border-gray-200 hover:border-gray-300 text-sm font-medium'
								onClick={logout}
							>
								<LogOut size={16} />
								<span className='ml-2'>Log Out</span>
							</button>
						) : (
							<div className='flex gap-3 items-center'>
								<Link
									to={"/login"}
									className='text-gray-600 hover:text-pink-600 py-2 px-4 rounded-lg flex items-center transition-all duration-200 border border-gray-200 hover:border-pink-300 text-sm font-medium'
								>
									<LogIn className='mr-2' size={16} />
									Login
								</Link>
								<Link
									to={"/signup"}
									className='bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white py-2 px-4 rounded-lg flex items-center transition-all duration-200 shadow-lg shadow-pink-500/20 text-sm font-semibold'
								>
									<UserPlus className='mr-2' size={16} />
									Sign Up
								</Link>
							</div>
						)}
					</nav>

					{/* Mobile menu button */}
					<button
						className='md:hidden text-gray-600 hover:text-pink-600 transition-colors p-2'
						onClick={() => setMobileOpen(!mobileOpen)}
						aria-label={mobileOpen ? "Close menu" : "Open menu"}
					>
						{mobileOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>

				{/* Mobile nav */}
				{mobileOpen && (
					<nav className='md:hidden mt-4 pb-4 border-t border-pink-100 pt-4 space-y-3 animate-slide-down'>
						<Link
							to={"/"}
							className='block text-gray-600 hover:text-pink-600 transition py-2 font-medium'
							onClick={() => setMobileOpen(false)}
						>
							Home
						</Link>
						{user && (
							<Link
								to={"/cart"}
								className='flex items-center gap-2 text-gray-600 hover:text-pink-600 transition py-2 font-medium'
								onClick={() => setMobileOpen(false)}
							>
								<ShoppingCart size={20} />
								Cart
								{cart.length > 0 && (
									<span className='bg-pink-500 text-white rounded-full px-2 py-0.5 text-xs'>{cart.length}</span>
								)}
							</Link>
						)}
						{isAdmin && (
							<Link
								to={"/secret-dashboard"}
								className='flex items-center gap-2 bg-pink-600 hover:bg-pink-500 text-white px-3 py-2 rounded-lg transition font-medium text-sm w-fit'
								onClick={() => setMobileOpen(false)}
							>
								<Lock size={16} />
								Dashboard
							</Link>
						)}
						{user ? (
							<button
								onClick={() => { logout(); setMobileOpen(false); }}
								className='flex items-center gap-2 text-gray-600 hover:text-pink-600 transition py-2 font-medium'
							>
								<LogOut size={20} />
								Log Out
							</button>
						) : (
							<div className='flex gap-3 pt-2'>
								<Link
									to={"/login"}
									className='flex-1 text-center border border-gray-200 hover:border-pink-300 text-gray-600 py-2 rounded-lg transition font-medium text-sm'
									onClick={() => setMobileOpen(false)}
								>
									Login
								</Link>
								<Link
									to={"/signup"}
									className='flex-1 text-center bg-gradient-to-r from-pink-600 to-pink-500 text-white py-2 rounded-lg transition font-semibold text-sm'
									onClick={() => setMobileOpen(false)}
								>
									Sign Up
								</Link>
							</div>
						)}
					</nav>
				)}
			</div>
		</header>
	);
};
export default Navbar;