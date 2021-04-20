import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BestGenreRow extends React.Component {
	/* ---- Q3b (Best Movies) ---- */
	render() {
		return (
			<div className="movieResults">
				<div className="title">{this.props.movie.title}</div>
				<div className="id">{this.props.movie.movie_id}</div>
				<div className="rating">{this.props.movie.rating}</div>
			</div>
		);
	};
};
