import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class DashboardMovieRow extends React.Component {

	/* ---- Q1b (Dashboard) ---- */
	/* Change the contents (NOT THE STRUCTURE) of the HTML elements to show a movie row. */
	render() {
		return (
			<div className="movie">
				<div className="title"><a href={this.props.movie.listing_url}>{this.props.movie.id}</a></div>
				<div className="pic"><img src={this.props.movie.picture_url}></img></div>
			</div>
		);
	};
};
