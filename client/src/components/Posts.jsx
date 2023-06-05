import React from "react";
import { Link } from "react-router-dom";

const Posts = ({ postType, posts, getText }) => {
	return (
		<div
			className={
				postType === "homeposts"
					? "homeposts-wrapper"
					: "dashboard-posts-wrapper"
			}>
			{posts.map((post) => (
				<div
					className={
						postType === "homeposts"
							? "single-post-body"
							: "dashboard-single-post-body"
					}
					key={post.id}>
					<div
						className={
							postType === "homeposts"
								? "post-img-div md:after:block"
								: "post-img-div lg:after:block"
						}>
						<img
							className="post-img"
							src={`../upload/${post.img}`}
							alt={`../upload/${post.img}`}
						/>
					</div>
					<div className="post-text-wrap">
						<Link className="link" to={`/post/${post.id}`}>
							<h1 className="post-title">{post.title}</h1>
						</Link>
						<p className="post-desc">
							{post.desc.length >= 120
								? `${getText(post.desc)}`
								: `${getText(post.desc.slice(0, 100))}...`}
						</p>
						<button className="post-btn">
							<Link className="link" to={`/post/${post.id}`}>
								read more
							</Link>
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default Posts;
