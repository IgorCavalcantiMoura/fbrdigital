import { Providers } from './../../providers/entities/providers.entity';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Operations } from "../entities/operations.entities";
import { DeleteResult, ILike, Repository } from "typeorm";
import { ProviderService } from '../../providers/services/providers.service';


@Injectable()
export class OperationsService {
    constructor(
        @InjectRepository(Operations)
        private operationsRepository: Repository<Operations>,
        private providersService: ProviderService
    ){}

    async findAll(): Promise<Operations[]> {
        return await  this.operationsRepository.find({
            relations: {
                providers: true
            }
        })
    }

    async findById(id: number): Promise<Operations>{

        let operations = await this.operationsRepository.findOne({
            where: {
                id
            },
            relations: {
                providers: true
            }
        })

        if (!operations)
            throw new HttpException("Serviço não encontrado!", HttpStatus.NOT_FOUND)

        return operations;
    }

    async findByServiceType(service_type: string): Promise<Operations[]>{
        return await this.operationsRepository.find({
            where: {
                service_type: ILike(`%${service_type}`)
            },
            relations: {
                providers: true
            }
        })
    }

    async create(operations: Operations): Promise<Operations>{
        
        if (operations.providers){

            let providers = await this.providersService.findById(operations.providers.id)

            if(!providers)
                throw new HttpException("Provedor não encontrado!", HttpStatus.NOT_FOUND);

            return await this.operationsRepository.save(operations)
        }
        
        return await this.operationsRepository.save(operations)
    }

    async update(operations: Operations): Promise<Operations>{

        let findOperations = await this.findById(operations.id);

        if (!findOperations || operations.id)
            throw new HttpException("Serviço não encontrado!", HttpStatus.NOT_FOUND)

        if (operations.providers){

            let providers = await this.providersService.findById(operations.providers.id)

            if (!providers)
                throw new HttpException("Provedor não encontrado!", HttpStatus.NOT_FOUND);

            return await this.operationsRepository.save(operations)
        }

        return await this.operationsRepository.save(operations)
    }

    async delete(id: number): Promise<DeleteResult> {
        
        let findOperations = await this.findById(id);

        if(!findOperations)
            throw new HttpException("Serviço não encontrado", HttpStatus.NOT_FOUND);

        return await this.operationsRepository.delete(id);
    }
}