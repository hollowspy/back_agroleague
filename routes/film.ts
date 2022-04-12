import express, { Router } from 'express';
const router:Router = express.Router();

router.get('/', (req, res, next) => {
    return res.send({
        sucess: 'toto'
    })
})


module.exports = router;

