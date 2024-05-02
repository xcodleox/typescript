import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TransactionsService } from "../services/transactions.service";
import { CreatedTransactionDTO, GetDdashBoardTDO, IndexTransactionsDTO, getFinanciaEvolutionDTO } from "../dtos/transactions.dto";
import { BodyRequest, QueryRequest } from "./types";

export class TransactionsController {

    constructor(private transactionsService: TransactionsService) { }

    create = async (req: BodyRequest<CreatedTransactionDTO>, res: Response, next: NextFunction) => {

        try {

            const { title,
                type,
                date,
                categoryId,
                amount } = req.body

            const result = await this.transactionsService.create({
                title,
                type,
                date,
                categoryId,
                amount
            });

            return res.status(StatusCodes.CREATED).json(result)
        }
        catch (error) {
            next(error)
        }

    }


    index = async (
        req: QueryRequest<IndexTransactionsDTO>,
        res: Response,
        next: NextFunction) => {

        try {

            const { title, categoryId, beginDate, endDate } = req.query

            const result = await this.transactionsService.index({ title, categoryId, beginDate, endDate });

            return res.status(StatusCodes.OK).json(result)
        }
        catch (error) {
            next(error)
        }
    }

    getDashboard = async (
        req: QueryRequest<GetDdashBoardTDO>,
        res: Response,
        next: NextFunction) => {

        try {

            const { beginDate, endDate } = req.query

            const result = await this.transactionsService.getDashboard({ beginDate, endDate });

            return res.status(StatusCodes.OK).json(result)
        }
        catch (error) {
            next(error)
        }

    }


    getFinancialEvolution = async (
        req: QueryRequest<getFinanciaEvolutionDTO>,
        res: Response,
        next: NextFunction) => {

        try {

            const { year } = req.query

            const result = await this.transactionsService.getFinancialEvolution({ year });

            return res.status(StatusCodes.OK).json(result)
        }
        catch (error) {
            next(error)
        }

    }

}