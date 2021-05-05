import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ListingReviewsRow extends React.Component {
	render() {
		return (
			<div className="reviewResults">
				<div className="comment">{this.props.movie.comments}</div>
			</div>
		);
	};
};
