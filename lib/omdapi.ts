import {AxiosResponse} from "axios";

const conf = require('../conf');
const axios = require('axios');

export interface ParamsSearchFilmI {
    apiKey: string,
    s: string;
    page: number,
    type: string
}

export interface ParamsFullFilmI {
    apiKey: string,
    i: string;
}

const searchFilm = async (title:string, page:number) => {
    try {
        const params:ParamsSearchFilmI = {
            apiKey: conf.omdApi.apiKey,
            s: title,
            page,
            type: 'movie'
        };
        const response:AxiosResponse = await axios.get(conf.omdApi.url, { params });
        return response
    }
    catch (error) {
        return error;
    }
};


const getFullFilm = async (id:string) => {
    try {
        const params:ParamsFullFilmI = {
            apiKey: conf.omdApi.apiKey,
            i: id,
        };
        const response:AxiosResponse = await axios.get(conf.omdApi.url, { params });
        return response
    }
    catch (error) {
        return error;
    }
}

module.exports = {
    searchFilm,
    getFullFilm
}
