import express, { Express, Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import {HttpException} from './exceptions/HttpException'
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./routes/api');
const app:Express = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({origin: true, credentials: true}))


// Use router middleware
app.use('/', api);


app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})


// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
    next(createError(404));
});



// error handler
app.use(function(err:HttpException, req:Request, res:Response, next:NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});
