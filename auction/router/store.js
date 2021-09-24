import express from 'express';
import { body } from 'express-validator';
import * as storeController from '../controller/store.js';
import { validate } from '../middleware/validator.js';
import * as buyerController from '../controller/buyer.js';
const router = express.Router();

const validateProduct = [
    body('price')
    .trim()
    .isLength({max : 9})
    .withMessage('시작 금액이 너무 높습니다')
    .isNumeric()
    .withMessage('시작 금액에는 숫자만 입력하세요'),
    body('name')
    .trim()
    .isLength({min : 3})
    .withMessage('제목이 너무 짧습니다'),
    validate,
];


router.get('/', storeController.getProducts);

router.get('/bid', buyerController.getProducts);

router.get('/bid/:id', buyerController.getProduct);

router.get('/:id', storeController.getProduct);


router.post('/', validateProduct,  storeController.createProduct)

router.post('/bid', buyerController.createProduct)


router.put('/:id', storeController.updateProduct)

router.put('/plus/:id', storeController.plusProduct)

router.delete('/:id',storeController.removeProduct)

export default router;