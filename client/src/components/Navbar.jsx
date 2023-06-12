import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
	const { currentUser, logout } = useContext(AuthContext);

	const HandleToggler = (elementId) => {
		document.getElementById(elementId).classList.toggle("flex");
		document.getElementById(elementId).classList.toggle("hidden");
	};

	return (
		<div className="navbar">
			<div className="py-2 px-4 flex justify-between">
				<Link className="flex items-center gap-2" to={"/"}>
					<div className="logo">
						<h4 className="logo-text">
							Abd
							<span className="logo-span">ullah</span>.dev
						</h4>
					</div>
				</Link>
				<div className="navLinks">
					<Link className="navLink" to="/?cat=art">
						<h6 className="nav-h6">ART</h6>
					</Link>
					<Link className="navLink" to="/?cat=fashion">
						<h6 className="nav-h6">FASHION</h6>
					</Link>
					<Link className="navLink" to="/?cat=science">
						<h6 className="nav-h6">SCIENCE</h6>
					</Link>
					<Link className="navLink" to="/?cat=technology">
						<h6 className="nav-h6">TECHNOLOGY</h6>
					</Link>
					<Link className="navLink" to="/?cat=cinema">
						<h6 className="nav-h6">CINEMA</h6>
					</Link>
					<Link className="linknavLink" to="/?cat=design">
						<h6 className="nav-h6">DESIGN</h6>
					</Link>
					<Link className="linknavLink" to="/?cat=food">
						<h6 className="nav-h6">FOOD</h6>
					</Link>
					<span className="navSpan font-semibold capitalize">
						<Link to={"/dashboard"}>{currentUser?.username}</Link>
					</span>
					{currentUser ? (
						<span
							onClick={logout}
							className="navSpan font-semibold hover:text-red-600">
							<Link to={"/"}>Logout</Link>
						</span>
					) : (
						<Link className="linknavLink font-semibold" to="/login">
							Login
						</Link>
					)}{" "}
					<span className=" navSpan flex justify-center items-center font-normal text-white bg-teal-500 w-12 h-12 rounded-full border-2 border-solid border-white  hover:bg-white hover:border-[1px] hover:border-solid hover:border-teal-500 dark:hover:bg-transparent">
						{!currentUser ? (
							<div onClick={() => HandleToggler("loginReqModal")}>
								Write
								<div
									id="loginReqModal"
									className="absolute top-0 left-0 z-20 hidden w-full bg-[#00000050] h-screen justify-center items-center">
									<div className="relative z-20 py-10 px-16 border border-teal-300 rounded-xl bg-white dark:bg-slate-900 shadow-lg shadow-teal-300 text-center flex flex-col gap-8 capitalize">
										please Login
										<div className="flex gap-8">
											<Link
												className="py-2 px-4 rounded-lg bg-teal-300 text-slate-900"
												to={"/login"}>
												Login
											</Link>
											<button className="py-2 px-4 border rounded-lg border-teal-300">
												No thanks
											</button>
										</div>
									</div>
								</div>
							</div>
						) : (
							<Link className="navLink hover:text-teal-500" to="/Write">
								Write
							</Link>
						)}
					</span>
				</div>
				<div className=" flex gap-4 lg:hidden items-center">
					{currentUser &&
						(currentUser.img ? (
							<Link
								className="navLink"
								onMouseOut={() => HandleToggler("logoutBtn")}
								to="/dashboard">
								<img
									className="rounded-full object-cover w-12 h-12 border-2"
									src={`../profile/${currentUser.img}`}
									alt="user-profile"
								/>
								<Link
									id="logoutBtn"
									onClick={logout}
									className="hidden absolute "
									to={"/"}>
									Logout
								</Link>
							</Link>
						) : (
							<Link
								className="navSpan font-semibold capitalize"
								onMouseOver={() => HandleToggler("logoutBtn")}
								to="/dashboard">
								{currentUser.username}
							</Link>
						))}
					<div
						className="text-5xl cursor-pointer"
						onClick={() => HandleToggler("mobile")}>
						&#9776;
					</div>
					<div
						id="mobile"
						onClick={() => HandleToggler("mobile")}
						className="navLinks-mobile hidden">
						<Link className="navLink" to="/?cat=art">
							<h6 className="nav-h6">ART</h6>
						</Link>
						<Link className="navLink" to="/?cat=fashion">
							<h6 className="nav-h6">FASHION</h6>
						</Link>
						<Link className="navLink" to="/?cat=science">
							<h6 className="nav-h6">SCIENCE</h6>
						</Link>
						<Link className="navLink" to="/?cat=technology">
							<h6 className="nav-h6">TECHNOLOGY</h6>
						</Link>
						<Link className="navLink" to="/?cat=cinema">
							<h6 className="nav-h6">CINEMA</h6>
						</Link>
						<Link className="linknavLink" to="/?cat=design">
							<h6 className="nav-h6">DESIGN</h6>
						</Link>
						<Link className="linknavLink" to="/?cat=food">
							<h6 className="nav-h6">FOOD</h6>
						</Link>
						{/* <span className="navSpan font-semibold capitalize">
							<Link to={"/dashboard"}>{currentUser?.username}</Link>
						</span> */}
						{currentUser ? (
							<span
								onClick={logout}
								className="navSpan font-semibold hover:text-red-600">
								<Link to={"/"}>Logout</Link>
							</span>
						) : (
							<Link className="linknavLink font-semibold" to="/login">
								Login
							</Link>
						)}{" "}
						<span className=" navSpan flex justify-center items-center font-normal text-white bg-teal-500 w-12 h-12 rounded-full border-2 border-solid border-white  hover:bg-white hover:border-[1px] hover:border-solid hover:border-teal-500 dark:hover:bg-transparent">
							{!currentUser ? (
								<div onClick={() => HandleToggler("loginReqModal")}>
									Write
									<div
										id="loginReqModal"
										className="absolute top-0 left-0 z-30 hidden w-full bg-[#00000050] h-screen justify-center items-center">
										<div className="relative z-20 py-10 px-16 border border-teal-300 rounded-xl bg-white dark:bg-slate-900 shadow-lg shadow-teal-300 text-center flex flex-col gap-8 capitalize">
											please Login
											<div className="flex gap-8">
												<Link
													className="py-2 px-4 rounded-lg bg-teal-300 text-slate-900"
													to={"/login"}>
													Login
												</Link>
												<button className="py-2 px-4 border rounded-lg border-teal-300">
													No thanks
												</button>
											</div>
										</div>
									</div>
								</div>
							) : (
								<Link className="navLink hover:text-teal-500" to="/Write">
									Write
								</Link>
							)}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
