import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ListingRow extends React.Component {
	render() {
		return (
			<div className="loud-results">
                <div className="link"><a href={this.props.movie.listing_url}>{this.props.movie.description}</a></div>
			</div>
		);
	};
};