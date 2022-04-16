import {HttpException} from "../exceptions/HttpException";
const { wrap } = require('express-promise-wrap');
import { Request, Response, NextFunction } from 'express';
const NodeCache = require( "node-cache" );
import {AxiosResponse} from "axios";
import {SearchFilm} from "../Models/searchFilm";
import {FullFilm} from "../Models/fullFilm";

const myCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );

export interface AxiosResCustom extends AxiosResponse {
    response: any
};

// import OMDAPI lib
const omdApi = require("../lib/omdapi");

const filmController = {
    
    searchFilms: wrap(async (req: Request, res: Response, next:NextFunction) => {
        if (!req.query.title || !req.query.page) {
            const error = new HttpException(400, 'Req query Title or req query Page is missing')
            return next(error);
        }
    
        const dataCache = myCache.get(`${req.query.title}-page${req.query.page}`);
        if (dataCache) {
            return res.send(dataCache)
        }
        const resAPI:AxiosResCustom = await omdApi.searchFilm(req.query.title, req.query.page);
        if (resAPI && resAPI.response && resAPI.response.data.Response === 'False') {
            const error = new HttpException(400, resAPI.response.data.Error);
            return next(error)
        }
        if (resAPI && resAPI.data && resAPI.data.Response === 'False') {
            const error = new HttpException(400, resAPI.data.Response);
            return next(error)
        }
        // Add to cache
    
        myCache.set(`${req.query.title}-page${req.query.page}`, resAPI.data, 60 );
        const dataAPI:SearchFilm[] = resAPI.data
        return res.send(dataAPI);
    }),
    
    getFullFilm: wrap(async (req: Request, res: Response, next: NextFunction) => {
        if (!req.params.id) {
            const error = new HttpException(400, 'req params is missing')
            return next(error);
        }
        const dataCache = myCache.get(`get_film_id_${req.params.id}`);
        if (dataCache) {
            return res.send(dataCache)
        }
        const resAPI:AxiosResCustom = await omdApi.getFullFilm(req.params.id);
        if (resAPI && resAPI.response && resAPI.response.data.Response === 'False') {
            const error = new HttpException(400, resAPI.response.data.Error);
            return next(error)
        }
    
        if (resAPI.data.Response === 'False') {
            const error = new HttpException(400, resAPI.data);
            return next(error);
        }
        
        myCache.set(`get_film_id_${req.params.id}`, resAPI.data, 60 );
        const dataAPI:FullFilm = resAPI.data;
        return res.send(dataAPI)
    })
    
};

module.exports = filmController
