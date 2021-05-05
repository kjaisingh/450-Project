import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class FindReviewRow extends React.Component {
	/* ---- Q2 (Recommendations) ---- */
	render() {
		return (
			<div className="reviewResults">
				<div className="Name"><a href={this.props.movie.host_url}>{this.props.movie.host_name}</a></div>
				<div className="Picture"><a href={this.props.movie.picture_url}>{this.props.movie.avg}</a></div>
			</div>
		);
	};
};