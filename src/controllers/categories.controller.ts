import { NextFunction, Request, Response } from "express";
import { CategoriesService } from "../services/categories.service";
import { createdCategoryDTO } from "../dtos/categories.dtos";
import { StatusCodes } from "http-status-codes";
import { BodyRequest } from "./types";

export class CategoriesController {

    constructor(private categoriesService: CategoriesService) {}


     index = async (_: Request, res: Response, next: NextFunction) => {
        try {


        /*const respository = new CategoriesRepository(CategoryModel);
        const service = new CategoriesService(respository)*/
  
        const result = await this.categoriesService.index()

        return res.status(StatusCodes.OK).json(result)
        } 
        catch (error){
            next(error)
        }

    }


     create = async (req: BodyRequest<createdCategoryDTO>, res: Response, next: NextFunction) => {

        try {

            const {title, color} = req.body

        /*const respository = new CategoriesRepository(CategoryModel);
        const service = new CategoriesService(respository)*/
  
        const result = await this.categoriesService.create({title, color});

        return res.status(StatusCodes.CREATED).json(result)
        } 
        catch (error){
            next(error)
        }

    }

}