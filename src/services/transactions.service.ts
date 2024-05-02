import { TransactionsRepository } from "../database/repositories/transactions.repository";
import { Transaction } from "../entities/transactions.entity";
import { CategoriesRepository } from "../database/repositories/categories.repository";
import { AppError } from "../errors/app.error";
import { StatusCodes } from "http-status-codes";
import { CreatedTransactionDTO, GetDdashBoardTDO, IndexTransactionsDTO, getFinanciaEvolutionDTO } from "../dtos/transactions.dto";
import { Balance } from "../entities/balance.entity";
import { Expense } from "../entities/expense.entity";

export class TransactionsService {
    constructor(private transactionsRepository: TransactionsRepository,
        private categoriesRepository: CategoriesRepository
    ) { }

    async create({
        title,
        type,
        date,
        categoryId,
        amount
    }: CreatedTransactionDTO): Promise<Transaction>{

        const category = await this.categoriesRepository.findById(categoryId)

        if(!category){
            throw new AppError('categoria nao existe', StatusCodes.NOT_FOUND)
        }

        const transaction = new Transaction({
            title,
            type,
            date,
            category,
            amount
        })

        const createTransaction = await this.transactionsRepository.create(transaction);

        return createTransaction

    }

      async index(filters:IndexTransactionsDTO): Promise<Transaction[]>{
        const transactions = await this.transactionsRepository.index(filters)

        return transactions
      }


      async getDashboard({beginDate, endDate}: 
        GetDdashBoardTDO): Promise<{balance: Balance, expenses: Expense[]}>{
        
    let [balance, expenses] = await Promise.all
    ([
        this.transactionsRepository.getBalance({beginDate, endDate}),
        this.transactionsRepository.getExpenses({beginDate, endDate})
    ])
        
        if(!balance){
            balance = new Balance({
                _id: null,
                incomes: 0,
                expenses: 0,
                balance: 0,
            });
        }

            return {balance, expenses}
      }


      async getFinancialEvolution({year}: getFinanciaEvolutionDTO): Promise<Balance[]>{
        const financialEvolution = await 
        this.transactionsRepository.getFinanciaEvolution({year})

        return financialEvolution
      }
      
      
}
