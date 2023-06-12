import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import img01 from "../images/taking-notes-and-working-on-laptop.jpg";
// import userPorfile from "../images/fresh-dude.jpg";
import Edit from "../images/edit.png";
import Delete from "../images/delete.png";
import Menu from "../components/menu";
import Axios from "axios";
import { AuthContext } from "../context/authContext";

const Single = ({ getText }) => {
	const [post, setPost] = useState({});
	const location = useLocation();
	const navigate = useNavigate();

	const postId = location.pathname.split("/")[2];
	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		const fectchData = async () => {
			try {
				await Axios.get(`/posts/${postId}`).then((response) => {
					if (response.data.length === 0) navigate("*");
					setPost(response.data);
					// console.log(post.userProfile);
				});
			} catch (err) {
				console.log(err);
			}
		};
		fectchData();
	}, [postId, navigate]);

	const handleDelete = async () => {
		try {
			Axios.delete(`/posts/${postId}`).then((response) =>
				console.log(response)
			);
			navigate("/");
		} catch (error) {
			console.log(error.response.data);
		}
	};
	return (
		<div className="flex flex-col lg:flex-row mt-3 gap-12 px-5">
			<div className="basis-9/12 flex flex-col gap-7">
				<img
					className="w-full h-72 object-cover"
					src={`../upload/${post.img}`}
					alt=""
				/>
				<div className="flex">
					<div className="flex items-center gap-2 ">
						{post.userProfile && (
							<img
								className="rounded-full object-cover w-12 h-12"
								src={`../profile/${post.userProfile}`}
								alt=""
							/>
						)}
						<div className="info">
							<span className="font-bold capitalize">{post.username}</span>
							<p>Posted 2 days ago</p>
						</div>
						{currentUser?.username === post.username && (
							<div className="flex gap-1">
								<Link
									className="link"
									to={`/write?edit=${postId}`}
									state={post}>
									<img
										className="w-5 h-5 cursor-pointer"
										src={Edit}
										alt="edit-button"
									/>
								</Link>
								<img
									onClick={handleDelete}
									className="w-5 h-5 cursor-pointer"
									src={Delete}
									alt="delete-button"
								/>
							</div>
						)}
					</div>

					<div className="grow flex flex-col justify-end items-end capitalize">
						<div>Last Updated: {post.lastDate ? post.lastDate : "unknown"}</div>
						<div>{post.cat}</div>
					</div>
				</div>
				<h1 className="text-gray-800 text-5xl font-bold dark:text-gray-300">
					{post.title}
				</h1>
				{getText(post.desc)}
			</div>
			<Menu cat={post.cat} />
		</div>
	);
};

export default Single;
