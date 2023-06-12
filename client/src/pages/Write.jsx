import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Cat from "../components/Cat";
import Axios from "axios";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";

const Write = () => {
	const state = useLocation().state;
	const navigate = useNavigate();
	const [value, setValue] = useState(state?.desc || "");
	const [title, setTitle] = useState(state?.title || "");
	const [file, setFile] = useState(null);
	const [cat, setCat] = useState(state?.cat || null);

	const Upload = async () => {
		try {
			const formData = new FormData();
			formData.append("file", file);
			const res = await Axios.post("/publish", formData);
			return res.data;
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const imgUrl = await Upload();
		// console.log(imgUrl);

		try {
			state
				? Axios.put(`/posts/${state.id}`, {
						title,
						desc: value,
						cat,
						img: file ? imgUrl : "",
						lastupdated: moment(Date.now()).format("YYYY-MM-DD HH:mm"),
				  }).then((res) => console.log(res.data))
				: Axios.post(`/posts`, {
						title,
						desc: value,
						cat,
						img: file ? imgUrl : "",
						date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
						lastupdated: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
				  }).then((res) => console.log(res.data));
		} catch (error) {
			console.log(error);
		}
		// console.log(state);
		navigate(`/post/${state.id}`);
	};

	return (
		<div className="flex flex-col md:flex-row gap-5 md:px-6">
			<div className="basis-3/4 flex flex-col gap-5">
				<input
					className="p-2 border-[1px] border-solid border-gray-400 dark:text-gray-700"
					type="text"
					value={title}
					placeholder="Title"
					onChange={(e) => {
						setTitle(e.target.value);
					}}
				/>
				<div className="border-[1px] border-solid border-gray-400 overflow-hidden h-80">
					<ReactQuill
						className="h-full border-none dark:text-gray-300"
						theme="snow"
						id="desc"
						value={value}
						onChange={setValue}
					/>
				</div>
			</div>
			<div className="basis-1/4 flex md:flex-col  gap-5">
				<div className="menu-item">
					<h1 className="menu-heading">Publish</h1>
					<span>
						<b>Status:</b> Draft
					</span>
					<span>
						<b>visibility:</b> Public
					</span>
					<input
						style={{
							display: "none",
						}}
						type="file"
						id="file"
						name="file"
						onChange={(e) => setFile(e.target.files[0])}
					/>
					<label className="cursor-pointer underline" htmlFor="file">
						Upload image
					</label>
					<div className="flex justify-between">
						<button
							// onClick={() => Upload()}
							className="btns border-teal-700 text-teal-700 dark:bg-gray-300 dark:border-gray-300">
							Save as a draft
						</button>
						<button
							onClick={handleSubmit}
							className="btns bg-teal-700 border-teal-700 text-white">
							{state?.title ? "Update" : "Publish"}
						</button>
					</div>
				</div>
				<Cat cat={cat} setCat={setCat} />
			</div>
		</div>
	);
};

export default Write;
