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
const conf = require('../conf');
const axios = require('axios');
const searchFilm = (title, page) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = {
            apiKey: conf.omdApi.apiKey,
            s: title,
            page,
            plot: 'full',
            type: 'movie'
        };
        const response = yield axios.get(conf.omdApi.url, { params });
        return response;
    }
    catch (error) {
        return error;
    }
});
const getFullFilm = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = {
            apiKey: conf.omdApi.apiKey,
            i: id,
        };
        const response = yield axios.get(conf.omdApi.url, { params });
        return response;
    }
    catch (error) {
        return error;
    }
});
module.exports = {
    searchFilm,
    getFullFilm
};
