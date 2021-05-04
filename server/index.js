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


/* ---- Find an AirBNB ---- */
app.get('/find/:movieName/:numberOfPeople/:superHostNeeded/:prefPrice', routes.getRecs);
app.get('/find', routes.getFilter);

/* ---- The New York Party Experience ---- */
app.get('/decades', routes.getDecades);
app.get('/genres', routes.getGenres);
app.get('/nycparty/:selectedBorough/:selectedParty/:selectedBar', routes.getPartyBnb);
app.get('/nycparty/:selectedBorough/:selectedParty/:selectedBar/:id', routes.getResultsWithId);

/* ---- App ---- */
app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});