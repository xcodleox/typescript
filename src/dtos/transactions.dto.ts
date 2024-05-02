import {z} from 'zod';
import { TransactionType } from '../entities/transactions.entity';


export const createTransactionsSchema = {
    title: z.string(),
    amount: z.number().int().positive(),
    type: z.nativeEnum(TransactionType),
    date: z.coerce.date(),
    categoryId: z.string().length(24),
};


const  createTransactionObject = z.object(createTransactionsSchema)
export type CreatedTransactionDTO = z.infer<typeof createTransactionObject>



export const indexTransactionSchema = {
    title: z.string().optional(),
    categoryId: z.string().length(24).optional(),
    beginDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional()
}


const indexTransactionsObject = z.object(indexTransactionSchema);
export type IndexTransactionsDTO = z.infer<typeof indexTransactionsObject>


export const getDashboardSchema = {
    beginDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
};

const getDashboardObject = z.object(getDashboardSchema)

export type GetDdashBoardTDO = z.infer<typeof getDashboardObject>

export const getFinanciaEvolutionSchema = {
    year: z.string(), 
}

const getFinanciaEvolutionObject = z.object(getFinanciaEvolutionSchema)
export type getFinanciaEvolutionDTO = z.infer<typeof getFinanciaEvolutionObject>