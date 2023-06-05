import React from "react";

const Cat = ({ cat, setCat }) => {
	const category = [
		"art",
		"fashion",
		"science",
		"technology",
		"cinema",
		"design",
		"food",
	];
	return (
		<div className="menu-item">
			<h1 className="menu-heading">Category</h1>

			{category.map((cats) => (
				<div className="cat" key={cats}>
					<input
						type="radio"
						checked={cat === cats}
						name={"cat"}
						value={cats}
						id={cats}
						onChange={(e) => setCat(e.target.value)}
					/>
					<label htmlFor={cats}> {cats}</label>
				</div>
			))}
		</div>
	);
};

export default Cat;
