import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BestGenreRow extends React.Component {
	/* ---- Q3b (Best Movies) ---- */
	render() {
		return (
			<div className="movieResults">
				<div className="bookinglink">{this.props.movie.listing_url}</div>

				<div className="price">{this.props.movie.price}</div>

				<div className="rating">{this.props.movie.rating}</div>
				<div className="reviews">{this.props.movie.number_of_reviews}</div>
				
				<div className="picture">{this.props.movie.picture_url}</div>
			</div>
		);
	};
};
