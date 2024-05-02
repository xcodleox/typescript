import { Router } from "express";
import { ParamsType, validator } from "../middlewares/validator.middleware";
import { TransactionsController } from "../controllers/transactions.controller";
import { createTransactionsSchema, getDashboardSchema, getFinanciaEvolutionSchema, indexTransactionSchema } from "../dtos/transactions.dto";
import { TransactionsFactory } from "../factories/transactions.factory";



export const transactionsRoutes = Router();

const controller = new TransactionsController(TransactionsFactory.getServiceInstance());

transactionsRoutes.post('/', validator({
    schema: createTransactionsSchema,
    type: ParamsType.BODY
}), controller.create)

transactionsRoutes.get('/',validator({
    schema: indexTransactionSchema,
    type: ParamsType.QUERY
}), controller.index)

transactionsRoutes.get('/dashboard',validator({
    schema: getDashboardSchema,
    type: ParamsType.QUERY
}), controller.getDashboard)


transactionsRoutes.get('/financial-evolution',validator({
    schema: getFinanciaEvolutionSchema,
    type: ParamsType.QUERY
}), controller.getFinancialEvolution)