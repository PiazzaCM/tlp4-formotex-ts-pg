import { Router } from 'express';

import ProductController from '../controllers/product.controller';
import { validarJWT } from '../middlewares/validarJWT';

const ProductRouter = Router();

ProductRouter.post('/products/:id_organizacion', validarJWT, ProductController.create);

ProductRouter.get('/products', validarJWT, ProductController.getAll);

ProductRouter.get('/products/:id', validarJWT, ProductController.getById);

ProductRouter.put('/products/:id', validarJWT, ProductController.update);

ProductRouter.delete('/products/:id', validarJWT, ProductController.delete);

export { ProductRouter };