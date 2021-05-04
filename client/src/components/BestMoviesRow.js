import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BestGenreRow extends React.Component {
	/* ---- Q3b (Best Movies) ---- */
	render() {
		return (
			<div className="movieResults" id={this.props.id} onClick={this.props.onClick}>
				<div className="bookinglink"><a href={this.props.movie.listing_url}>{this.props.movie.id}</a></div>

				<div className="price">{this.props.movie.price}</div>

				<div className="rating">{this.props.movie.rating}</div>
				<div className="reviews">{this.props.movie.number_of_reviews}</div>
				
				<div className="picture"><a href={this.props.movie.picture_url}>{this.props.movie.name}</a></div>
			</div>
		);
	};
};
