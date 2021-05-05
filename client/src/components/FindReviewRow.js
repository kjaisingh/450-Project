import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class FindReviewRow extends React.Component {
	/* ---- Q2 (Recommendations) ---- */
	render() {
		return (
			<div className="reviewResults">
				<div className="Name">{this.props.movie.name}</div>
				<div className="Picture">{this.props.movie.picture_url}</div>
			</div>
		);
	};
};