const { wrap } = require('express-promise-wrap');
import express, { Router, Request, Response, NextFunction } from 'express';
const router:Router = express.Router();
const NodeCache = require( "node-cache" );
import {SearchFilm} from '../Models/searchFilm'
import {AxiosResponse} from "axios";
import { HttpException } from '../exceptions/HttpException';

const myCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );

export interface AxiosResCustom extends AxiosResponse {
    response: any
};

// import OMDAPI lib
const omdApi = require("../lib/omdapi");

router.get('/', wrap(async (req: Request, res: Response, next:NextFunction) => {
    if (!req.query.title) {
        const error = new HttpException(400, 'Req query Title is needed')
        return next(error);
    }

    const dataCache = myCache.get(req.query.title);
    console.log('dataCache', dataCache);
    if (dataCache) {
        return res.send(dataCache)
    }

    const resAPI:AxiosResCustom = await omdApi.searchFilm(req.query.title);
    if (resAPI && resAPI.response && resAPI.response.data.Response === 'False') {
        const error = new HttpException(400, resAPI.response.data.Error);
        return next(error)
    }
    if (resAPI && resAPI.data && resAPI.data.Response === 'False') {
        const error = new HttpException(400, resAPI.data.Response);
        return next(error)
    }
    // Add to cache

    const success = myCache.set( req.query.title, resAPI.data, 60 );
    console.log('success', success);
    const dataAPI:SearchFilm[] = resAPI.data

    return res.send(dataAPI);
}))



router.get('/:id', wrap(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.id) {
        const error = new HttpException(400, 'req params is missing')
        return next(error);
    }
    const resAPI = await omdApi.getFullFilm(req.params.id);
    if (resAPI && resAPI.response && resAPI.response.data.Response === 'False') {
        const error = new HttpException(400, resAPI.response.data.Error);
        return next(error)
    }

    if (resAPI.data.Response === 'False') {
        const error = new HttpException(400, resAPI.data);
        return next(error);
    }
    return res.send(resAPI.data)
}))



module.exports = router;

