import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class FindReviewRow extends React.Component {
	/* ---- Q2 (Recommendations) ---- */
	render() {
		return (
			<div className="reviewResults">
				<div className="Name"><a href={this.props.movie.listing_url}>{this.props.movie.name}</a></div>
				<div className="Picture"><a href={this.props.movie.picture_url}>{this.props.movie.rating}</a></div>
			</div>
		);
	};
};