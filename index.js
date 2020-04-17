const createError = require('http-errors');
const express = require('express');
const path = require('path');
const Routes = require('./back/routes/Routes');
const app = express();


app.set('views', path.join(__dirname, 'front'));
app.use(express.static('build'));
app.use(express.static('model'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

new Routes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});
// error handlers
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	// render the error page
	res.status(err.status || 500);
	res.send('Server error');
	next(err);
});
const http = require('http');
const port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}