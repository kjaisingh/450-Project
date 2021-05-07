import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class PageNavbar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			navDivs: []
		};
	};

	componentDidMount() {
		const pageList = ['home', 'Find an Airbnb', 'The New York Party Experience'];

		let navbarDivs = pageList.map((page, i) => {
			if (this.props.active === page) {
				return <a className="nav-item nav-link active" key={i} href={"/" + page}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
			} else if (page === 'Find an Airbnb') {
				return <a className="nav-item nav-link" key={i} href={"/find"}>Find an Airbnb</a>
			}else if (page === 'The New York Party Experience') {
				return <a className="nav-item nav-link" key={i} href={"/nycparty"}>Find an Experience</a>
			}else {
				return <a className="nav-item nav-link" key={i} href={"/" + page}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
			}
		});

		this.setState({
			navDivs: navbarDivs
		});
	};

	render() {
		return (
			<div className="PageNavbar">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
			      <span className="navbar-brand center">The New York Experience</span>
			      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
			        <div className="navbar-nav">
			        	{this.state.navDivs}
			        </div>
			      </div>
			    </nav>
			</div>
    );
	};
};