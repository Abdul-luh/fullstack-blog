import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const Menu = ({ cat }) => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fectchData = async () => {
			try {
				await Axios.get(`/posts/?cat=${cat}`).then((response) => {
					// console.log(response.data);
					setPosts(response.data);
				});
			} catch (err) {
				console.log(err);
			}
		};
		fectchData();
	}, [cat]);

	return (
		<div className="basis-3/12 flex flex-col gap-6">
			<h1 className="text-xl text-center font-bold text-gray-800 dark:text-gray-300">
				Other Posts You May Like
			</h1>
			<div className="flex md:flex-col gap-4">
				{posts.map((post) => (
					<div className="flex flex-col gap-2 basis-1/2" key={post.id}>
						<img
							className="w-full h-48 object-cover"
							src={`../upload/${post.img}`}
							alt={`../upload/${post.img}`}
						/>
						<h2 className="text-gray-800 text-2xl font-bold dark:text-gray-300">
							{post.title}
						</h2>
						<button className="py-2 px-4 cursor-pointer bg-white border-[1px] border-solid border-[#b9e7e7] text-texl-500 hover:border-[1px] hover:border-solid hover:border-white hover:text-black hover:bg-[#b9e7e7] dark:bg-transparent">
							<Link className="link" to={`/post/${post.id}`}>
								read more
							</Link>
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Menu;
