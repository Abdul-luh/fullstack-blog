import Home from "./pages/Home";
import Login from "./pages/Login";
import Single from "./pages/Single";
import Register from "./pages/Register";
import Write from "./pages/Write";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./index.css";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const getText = (html) => {
	const doc = new DOMParser().parseFromString(html, "text/html");
	return doc.body.textContent;
};

const Layout = () => {
	return (
		<>
			<Navbar />
			<Outlet getText={getText} />
			<Footer />
		</>
	);
};

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout getText={getText} />,
		children: [
			{
				path: "*",
				element: <NotFound />,
			},
			{
				path: "/",
				element: <Home getText={getText} />,
			},
			{
				path: "/post/:id",
				element: <Single getText={getText} />,
			},
			{
				path: "/write",
				element: <Write />,
			},
			{
				path: "/dashboard",
				element: <Dashboard getText={getText} />,
			},
		],
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Register />,
	},
]);

function App() {
	return (
		<div className="flex justify-center dark:bg-slate-900 dark:text-slate-300 min-h-screen">
			<div className="w-full lg:w-[1024px] md:px-5 ">
				<RouterProvider router={router} />
			</div>
		</div>
	);
}

export default App;
