import { Controller, HttpCode, HttpStatus, Get, Param, ParseIntPipe, Body, Post, Put, Delete} from "@nestjs/common";
import { ProviderService } from "../services/providers.service";
import { Providers } from "../entities/providers.entity";

@Controller("/providers")
export class ProvidersController {
    constructor(private readonly providersService: ProviderService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Providers[]> {
        return this.providersService.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Providers> {
        return this.providersService.findById(id);
    }

    @Get('/corporate_name/:corporate_name')
    @HttpCode(HttpStatus.OK)
    findByName(@Param('corporate_name') corporate_name: string): Promise<Providers[]> {
        return this.providersService.findByName(corporate_name);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() providers: Providers): Promise<Providers>{
        return this.providersService.create(providers)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() providers: Providers): Promise<Providers>{
        return this.providersService.update(providers)
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe)id: number){
        return this.providersService.delete(id);
    }


}