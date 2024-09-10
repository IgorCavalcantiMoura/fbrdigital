import { Operations } from '../entities/operations.entities';
import { OperationsService } from './../services/operations.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";

@Controller("/operations")
export class OperationsController {

    constructor(private readonly operationsService: OperationsService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Operations[]> {
        return this.operationsService.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe)id: number): Promise<Operations> {
        return this.operationsService.findById(id)
    }

    @Get("/service_type/:service_type")
    @HttpCode(HttpStatus.OK)
    findByServiceType(@Param("service_type") service_type: string): Promise<Operations[]> {
        return this.operationsService.findByServiceType(service_type)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() operations: Operations): Promise<Operations> {
        return this.operationsService.create(operations);
  }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() operations: Operations): Promise<Operations> {
        return this.operationsService.update(operations);
  }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.operationsService.delete(id);
  }
}