import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class AirbnbPriceRow extends React.Component {
	render() {
		return (
			<div className="filterResults">
				<div className="Name"><a href={this.props.movie.listing_url}>{this.props.movie.name}</a></div>
				<div className="Room Type"><a href={this.props.movie.picture_url}>{this.props.movie.room_type}</a></div>
				<div className="Price">{this.props.movie.price}</div>
				<div className="Number of reviews">{this.props.movie.number_of_reviews}</div>
			</div>
		);
	};
};
