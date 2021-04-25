const config = require('./db-config.js');
const mysql = require('mysql');

config.connectionLimit = 10;
const connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


/* ---- Q1a (Dashboard) ---- */
// Equivalent to: function getTop20Keywords(req, res) {}
const getTop20Keywords = (req, res) => {
  const query = `
  WITH tab1 AS (SELECT city, COUNT(*) AS num 
  FROM Airbnb GROUP BY city) 
  SELECT city 
  FROM tab1 
  ORDER BY num DESC 
  LIMIT 20;
  `;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


/* ---- Q1b (Dashboard) ---- */
const getTopMoviesWithKeyword = (req, res) => {
  const inputKwd = req.params.keyword
  const query = `
  SELECT name, room_type, price 
  FROM Airbnb 
  WHERE city = '${inputKwd}' 
  ORDER BY reviews_per_month DESC 
  LIMIT 10;
`;

connection.query(query, (err, rows, fields) => {
  if (err) console.log(err);
  else res.json(rows);
});
};


/* ---- Q2 (Recommendations) ---- */
const getRecs = (req, res) => {
  const movie = req.params.movieName;
  const query = `
  WITH popular AS
    (SELECT movie_id, count(*) as count
    FROM cast_in
    WHERE cast_id IN
    (SELECT cast_id
    FROM cast_in JOIN movie ON cast_in.movie_id = movie.movie_id
    WHERE movie.title LIKE '${movie}')
    GROUP BY movie_id
    ORDER BY count DESC
    LIMIT 11)
  SELECT movie.title, movie.movie_id, movie.rating, movie.num_ratings
  FROM popular
  JOIN movie ON popular.movie_id = movie.movie_id
  WHERE movie.title <> '${movie}'
  ORDER BY popular.count DESC, movie.rating DESC, num_ratings DESC
  LIMIT 10;
`;

connection.query(query, (err, rows, fields) => {
  if (err) console.log(err);
  else res.json(rows);
});
};


/* ---- Q3a (Best Movies) ---- */
const getDecades = (req, res) => {
  const query = `
  SELECT DISTINCT 10*FLOOR(release_year / 10) as decade  
  FROM movie
  ORDER BY decade;  
  `;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


/* ---- (Best Movies) ---- */
const getGenres = (req, res) => {
  const query = `
    SELECT name
    FROM genre
    WHERE name <> 'genres'
    ORDER BY name ASC;
  `;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


/* ---- Q3b (Best Movies) ---- */
const bestMoviesPerDecadeGenre = (req, res) => {
  const genre = req.params.selectedGenre;
  const decade = req.params.selectedDecade;
  const query = `
  WITH info AS
    (SELECT a.movie_id, title, genre_name, a.release_year, a.rating
    FROM (SELECT movie.movie_id, title, release_year, rating
    FROM movie JOIN movie_genre ON movie_genre.movie_id = movie.movie_id
    WHERE release_year >= '${decade}' AND release_year < '${decade}' + 10 AND movie_genre.genre_name LIKE '${genre}') a
    JOIN movie_genre ON a.movie_id = movie_genre.movie_id),
    info2 AS
        (SELECT AVG(rating) as aver, genre_name
         FROM movie JOIN movie_genre ON movie_genre.movie_id = movie.movie_id
         WHERE release_year >= '${decade}' AND release_year < '${decade}' + 10
         GROUP BY genre_name),
    info3 AS
    (SELECT movie_id, title, info.genre_name, release_year, rating, aver
    FROM info JOIN info2 ON info.genre_name = info2.genre_name),
    info4 AS
    (SELECT movie_id, count(*) as cnt 
    FROM info
    GROUP BY movie_id),
    info5 AS
    (SELECT movie_id, count(*) as cnt 
    FROM info3
    WHERE rating >= aver
    GROUP BY movie_id)
SELECT info4.movie_id, movie.title, movie.rating
FROM info4 JOIN info5 ON info4.movie_id = info5.movie_id JOIN movie ON info4.movie_id = movie.movie_id
WHERE info4.cnt = info5.cnt
ORDER BY title
LIMIT 100;
`;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
  
};

module.exports = {
	getTop20Keywords: getTop20Keywords,
	getTopMoviesWithKeyword: getTopMoviesWithKeyword,
	getRecs: getRecs,
  getDecades: getDecades,
  getGenres: getGenres,
  bestMoviesPerDecadeGenre: bestMoviesPerDecadeGenre
};
