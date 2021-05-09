import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class AirbnbPriceRow extends React.Component {
	render() {
		return (
			<div className="movieResults">
				<div className="name"><a href={this.props.movie.listing_url}>{this.props.movie.name}</a></div>
				<div className="room_type"><a href={this.props.movie.picture_url}>{this.props.movie.room_type}</a></div>
				<div className="price">{this.props.movie.price}</div>
				<div className="host_name">{this.props.movie.number_of_reviews}</div>
			</div>
		);
	};
};
