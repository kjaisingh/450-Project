import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import KeywordButton from './KeywordButton';
import DashboardMovieRow from './DashboardMovieRow';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of keywords,
    // and a list of movies for a specified keyword.
    this.state = {
      keywords: [],
      movies: [],
      loudListings: [], // name (link) + neighbourhood
      quietListings: [] // name (link) + neighbourhood
    };

    this.showMovies = this.showMovies.bind(this);
  };

  // React function that is called when the page load.
  componentDidMount() {
    fetch("http://localhost:8081/keywords",
    {
      method: 'GET'
    }).then(res => {
      return res.json();
    }, err => {
      console.log(err);
    }).then(keywordsList => {
      if (!keywordsList) return;
      const keywordsDivs = keywordsList.map((keywordObj, i) =>
        <KeywordButton 
          id={"button-" + keywordObj.neighbourhood} 
          onClick={() => this.showMovies(keywordObj.neighbourhood)} 
          keyword={keywordObj.neighbourhood} 
        /> 
      );
      this.setState({
        keywords: keywordsDivs
      });
    }, err => {
      console.log(err);
    });
  };

  /* ---- Q1b (Dashboard) ---- */
  /* Set this.state.movies to a list of <DashboardMovieRow />'s. */
  showMovies(keyword) {
        // Send an HTTP request to the server.
        console.log(keyword);
        fetch("http://localhost:8081/keywords/" + keyword,
        {
                method: 'GET' // The type of HTTP request.
        }).then(res => {
          // Convert the response data to a JSON.
          return res.json();
        }, err => {
          // Print the error if there is one.
          console.log(err);
        }).then(movieList => {
          if (!movieList) return;
    
          // Map each keyword in this.state.keywords to an HTML element:
          // A button which triggers the showMovies function for each keyword.
          const movieDivs = movieList.map((movieObj, i) =>
            <DashboardMovieRow movie = {movieObj}
            /> 
          );
          console.log(movieList);
    
          // Set the state of the keywords list to the value returned by the HTTP response from the server.
          this.setState({
            movies: movieDivs
          });
        }, err => {
          // Print the error if there is one.
          console.log(err);
        });
  };

  render() {    
    return (
      <div className="Dashboard">

        <PageNavbar active="home" />
        <br />

        <div class="container">
						<div class="row">
							<div class="col-md-6 col-sm-6">
							<div class="jumbotron">
								<header>Nearby Bars</header>
								<div className="movies-container">
                  <div className="movie">
										<div className="header"><strong>Listing</strong></div>
										<div className="header"><strong>Neighbourhood</strong></div>
									</div>
									<div className="loud-results" id="results">
										{this.state.bars}
									</div>
								</div>
							</div>
							</div>
							<div class="col-md-6 col-sm-6">
							<div class="jumbotron">
								<header>Recent Reviews</header>
								<div className="movies-container">
                  <div className="movie">
										<div className="header"><strong>Listing</strong></div>
										<div className="header"><strong>Neighbourhood</strong></div>
									</div>		
									<div className="quiet-results" id="results">
										{this.state.reviews}
									</div>
								</div>
							</div>
							</div>

						</div>
				</div>
        <br />

        <div className="container movies-container">
          <div className="jumbotron">
            <div className="h5">Manhattan Neighbourhoods</div>
            <div className="keywords-container">
              {this.state.keywords}
            </div>
          </div>
          <br />

          <div className="jumbotron">
            <div className="movies-container">
              <div className="movies-header">
                <div className="header-lg"><strong>Name</strong></div>
                <div className="header"><strong>Room Type</strong></div>
                <div className="header"><strong>Price</strong></div>
              </div>
              <div className="results-container" id="results">
                {this.state.movies}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};
