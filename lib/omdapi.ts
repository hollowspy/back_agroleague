import {AxiosResponse} from "axios";

const conf = require('../conf');
const axios = require('axios');

const searchFilm = async (title:string) => {
    console.log('in search film');
    try {
        const url = conf.omdApi.url;
        const fullUrl = `${url}/?apikey=${conf.omdApi.apiKey}&type=movie&s=${title}`;
        const response:AxiosResponse = await axios.get(fullUrl);
        return response
    }
    catch (error) {
        return error;
    }
};


const getFullFilm = async (id:string) => {
    try {
        const url = conf.omdApi.url;
        const fullUrl = `${url}/?apikey=${conf.omdApi.apiKey}&i=${id}`;
        const response:AxiosResponse = await axios.get(fullUrl);
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
