import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class DashboardMovieRow extends React.Component {

	/* ---- Q1b (Dashboard) ---- */
	/* Change the contents (NOT THE STRUCTURE) of the HTML elements to show a movie row. */
	render() {
		return (
			<div className="movie">
				<div className="title">{this.props.movie.city}</div>
				<div className="rating">{this.props.movie.longitude}</div>
				<div className="votes">{this.props.movie.latitude}</div>
			</div>
		);
	};
};
