import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class RecommendationsRow extends React.Component {
	/* ---- Q2 (Recommendations) ---- */
	render() {
		return (
			<div className="movieResults">
				<div className="Name">{this.props.movie.name}</div>
				<div className="Room Type">{this.props.movie.room_type}</div>
				<div className="Price">{this.props.movie.price}</div>
				<div className="Number of reviews">{this.props.movie.number_of_reviews}</div>
			</div>
		);
	};
};
