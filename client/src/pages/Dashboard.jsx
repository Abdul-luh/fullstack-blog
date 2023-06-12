import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import Axios from "axios";
import Edit from "../images/edit.png";
// import { useLocation } from "react-router-dom";
import Posts from "../components/Posts";

const Dashboard = ({ getText }) => {
	const { currentUser } = useContext(AuthContext);
	const [posts, setPosts] = useState([]);
	const [img, setImg] = useState("");

	const userid = currentUser.id;

	const [file, setFile] = useState(null);

	const upload = async () => {
		const formData = new FormData();
		formData.append("profile", file);
		console.log(file);
		try {
			const res = await Axios.post("/profileUpload", formData);
			return res.data;
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdateUserImg = async (e) => {
		// e.preventDefault();
		const imgUrl = await upload();
		console.log(imgUrl);
		try {
			Axios.put(`/users/${userid}`, {
				img: file ? imgUrl : "",
			}).then((res) => {
				console.log(res.data);
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const fectchData = async () => {
			try {
				Axios.get(`/posts/myposts/${userid}`).then((result) => {
					setPosts(result.data);
				});
			} catch (err) {
				console.log(err);
			}
		};
		const fetchUserProfile = async () => {
			try {
				const res = await Axios.get(`/users/${userid}`);
				setImg(res.data);
			} catch (error) {
				console.log(error);
			}
		};

		fectchData();
		fetchUserProfile();
	}, [userid]);

	const HandleToggler = () => {
		document.getElementById("loginReqModal").classList.toggle("flex");
		document.getElementById("loginReqModal").classList.toggle("hidden");
	};

	return (
		<div className="font-semibold capitalize flex flex-col md:flex-row mt-20 gap-6">
			<div className="basis-1/5 flex flex-row md:flex-col justify-between md:justify-normal md:text-right items-center text-center gap-4 mx-7">
				<div>
					<label
						htmlFor="profileImg"
						onChange={(e) => e.target.file[0]}
						onDoubleClick={() => HandleToggler}
						className="flex justify-end">
						<img
							className="w-5 h-5 cursor-pointer"
							src={Edit}
							alt="edit-button"
						/>
					</label>

					<div onClick={() => HandleToggler()}>
						<img
							className="rounded-full object-cover w-16 h-16 border-2"
							src={`../profile/${img}`}
							alt="user-profile"
						/>
						<div
							id="loginReqModal"
							className="absolute top-0 left-0 z-20 hidden w-full bg-[#00000050] h-screen justify-center items-center">
							<img
								src={`../profile/${img}`}
								className=" h-screen w-auto"
								alt=""
							/>
						</div>
					</div>
					<input
						type="file"
						className="hidden"
						name="profileImg"
						id="profileImg"
						onChange={(e) => {
							setFile(e.target.files[0]);
						}}
					/>
					{file && (
						<button
							className="border border-teal-300 text-teal-300 px-4 py-2 hover:bg-teal-300 hover:text-slate-900"
							onClick={handleUpdateUserImg}>
							Change Profile
						</button>
					)}
				</div>
				<div className="text-right px-4">
					{currentUser.username} <br />
					{currentUser.email}
				</div>
			</div>
			<Posts postType={"dashboard-posts"} getText={getText} posts={posts} />
		</div>
	);
};

export default Dashboard;
