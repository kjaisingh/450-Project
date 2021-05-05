import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class RecommendationsRow extends React.Component {
	/* ---- Q2 (Recommendations) ---- */
	render() {
		return (
			<div className="movieResults">
				<div className="Name"><a href={this.props.movie.listing_url}>{this.props.movie.name}</a></div>
				<div className="Room Type"><a href={this.props.movie.picture_url}>{this.props.movie.room_type}</a></div>
				<div className="Price">{this.props.movie.price}</div>
				<div className="Number of reviews"><a href={this.props.movie.host_url}>{this.props.movie.host_name}</a></div>
			</div>
		);
	};
};
