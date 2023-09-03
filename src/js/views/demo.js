import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";

export const Demo = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<ul className="list-group">
				{store.demo.map((item, index) => {
					const isFavorite = favorites.includes(item.url);

					return (
						<li key={index} className="list-group-item d-flex justify-content-between" style={{ background: item.background }}>
							<Link to={"/single/" + index}>
								<span>Link to: {item.title}</span>
							</Link>
							<div className="d-flex align-items-center">
								{/* Display trash icon for favorites */}
								{isFavorite && (
									<button className="btn btn-danger mr-2" onClick={() => toggleFavorite(item.url)}>
										<i className="fas fa-trash"></i>
									</button>
								)}
								<button className="btn btn-success" onClick={() => actions.changeColor(index, "orange")}>
									Change Color
								</button>
							</div>
						</li>
					);
				})}
			</ul>
			<br />
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
};
