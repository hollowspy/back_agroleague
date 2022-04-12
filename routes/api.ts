import express, { Router } from 'express';
const router:Router = express.Router();


const filmRouter:Router = require('./film');
router.use('/films', filmRouter)



module.exports = router;
