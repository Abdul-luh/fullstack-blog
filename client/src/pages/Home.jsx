import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import Posts from "../components/Posts";

const Home = ({ getText }) => {
	const [posts, setPosts] = useState([]);
	const cat = useLocation().search;

	useEffect(() => {
		const fectchData = async () => {
			try {
				Axios.get(`/posts${cat}`).then((result) => {
					// console.log(result.data);
					setPosts(result.data);
				});
			} catch (err) {
				console.log(err);
			}
		};
		fectchData();
	}, [cat]);
	return (
		<div className="home">
			<Posts postType={"homeposts"} posts={posts} getText={getText} />
		</div>
	);
};

export default Home;
