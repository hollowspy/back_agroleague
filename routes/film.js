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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { wrap } = require('express-promise-wrap');
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const NodeCache = require("node-cache");
const HttpException_1 = require("../exceptions/HttpException");
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
;
// import OMDAPI lib
const omdApi = require("../lib/omdapi");
router.get('/', wrap((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    const success = myCache.set(req.query.title, resAPI.data, 60);
    const dataAPI = resAPI.data;
    return res.send(dataAPI);
})));
router.get('/:id', wrap((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        const error = new HttpException_1.HttpException(400, 'req params is missing');
        return next(error);
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
    return res.send(resAPI.data);
})));
module.exports = router;
