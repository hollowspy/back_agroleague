import express, { Router } from 'express';
const router:Router = express.Router();


const filmController = require('../controllers/films');

router.get('/', filmController.searchFilms);
router.get('/:id', filmController.getFullFilm)



module.exports = router;

