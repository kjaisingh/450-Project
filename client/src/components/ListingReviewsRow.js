import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ListingReviewsRow extends React.Component {
	render() {
		return (
			<div className="reviewResults">
				<div className="name">{this.props.movie.name}</div>
				<div className="comment">{this.props.movie.comment}</div>
			</div>
		);
	};
};
