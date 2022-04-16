"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../exceptions/HttpException");
const { wrap } = require('express-promise-wrap');
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
;
// import OMDAPI lib
const omdApi = require("../lib/omdapi");
const filmController = {
    searchFilms: wrap((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.query.title || !req.query.page) {
            const error = new HttpException_1.HttpException(400, 'Req query Title or req query Page is missing');
            return next(error);
        }
        const dataCache = myCache.get(`${req.query.title}-page${req.query.page}`);
        if (dataCache) {
            return res.send(dataCache);
        }
        const resAPI = yield omdApi.searchFilm(req.query.title, req.query.page);
        if (resAPI && resAPI.response && resAPI.response.data.Response === 'False') {
            const error = new HttpException_1.HttpException(400, resAPI.response.data.Error);
            return next(error);
        }
        if (resAPI && resAPI.data && resAPI.data.Response === 'False') {
            const error = new HttpException_1.HttpException(400, resAPI.data.Response);
            return next(error);
        }
        // Add to cache
        myCache.set(`${req.query.title}-page${req.query.page}`, resAPI.data, 60);
        const dataAPI = resAPI.data;
        return res.send(dataAPI);
    })),
    getFullFilm: wrap((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.params.id) {
            const error = new HttpException_1.HttpException(400, 'req params is missing');
            return next(error);
        }
        const dataCache = myCache.get(`get_film_id_${req.params.id}`);
        if (dataCache) {
            return res.send(dataCache);
        }
        const resAPI = yield omdApi.getFullFilm(req.params.id);
        if (resAPI && resAPI.response && resAPI.response.data.Response === 'False') {
            const error = new HttpException_1.HttpException(400, resAPI.response.data.Error);
            return next(error);
        }
        if (resAPI.data.Response === 'False') {
            const error = new HttpException_1.HttpException(400, resAPI.data);
            return next(error);
        }
        myCache.set(`get_film_id_${req.params.id}`, resAPI.data, 60);
        const dataAPI = resAPI.data;
        return res.send(dataAPI);
    }))
};
module.exports = filmController;
