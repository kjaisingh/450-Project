const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */

/* ---- Dashboard ---- */
app.get('/keywords', routes.getTop20Keywords);
app.get('/keywords/:keyword', routes.getTopMoviesWithKeyword);
app.get('/loudListings', routes.getLoudListings);
app.get('/quietListings', routes.getQuietListings);

/* ---- Find an AirBNB ---- */
app.get('/find/:movieName/:numberOfPeople/:superHostNeeded/:prefPrice/:wifiPresent/:TVPresent/:kitchenPresent/:refrigerator', routes.getRecs);
app.get('/find', routes.getFilter);
app.get('/find/:selectedFilter/:selectedBorough_T10', routes.getAirbnbPrice);
app.get('/find/:selectedBorough_topHosts', routes.getReviewPic);
app.get('/find/:recentReviewBorough/:x/:y', routes.getAgg);

/* ---- The New York Party Experience ---- */
app.get('/decades', routes.getDecades);
app.get('/genres', routes.getGenres);
app.get('/nycparty/:selectedBorough/:selectedParty/:selectedBar', routes.getPartyBnb);
app.get('/nycparty/:selectedBorough/:selectedParty/:selectedBar/:id/bars', routes.getBarResults);
app.get('/nycparty/:selectedBorough/:selectedParty/:selectedBar/:id/reviews', routes.getReviewResults);

/* ---- App ---- */
app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});