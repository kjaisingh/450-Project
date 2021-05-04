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

/* ---- (Dashboard) ---- */
// The route localhost:8081/keywords is registered to the function
// routes.getTop20Keywords, specified in routes.js.
app.get('/keywords', routes.getTop20Keywords);


/* ---- Q1b (Dashboard) ---- */
app.get('/keywords/:keyword', routes.getTopMoviesWithKeyword);


/* ---- Q2 (Recommendations) ---- */

app.get('/find/:movieName/:numberOfPeople/:superHostNeeded/:prefPrice', routes.getRecs);
app.get('/find', routes.getFilter);

/* ---- (Best Movies) ---- */
app.get('/decades', routes.getDecades);
app.get('/genres', routes.getGenres);


/* ---- Q3b (Best Movies) ---- */
app.get('/nycparty/:selectedBorough/:selectedParty/:selectedBar', routes.getPartyBnb);
app.get('/nycparty/:selectedBorough/:selectedParty/:selectedBar/:id', routes.getResultsWithId);

app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});