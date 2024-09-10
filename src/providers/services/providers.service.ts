import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Providers } from "../entities/providers.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class ProviderService{
    constructor(
        @InjectRepository(Providers)
        private providersRepository: Repository<Providers>
    ){}

    async findAll(): Promise<Providers[]>{
        return await this.providersRepository.find(
            {
                relations:{
                    operations: true
                }
            }
        )
    }

    async findById(id: number): Promise<Providers> {

        let providers = await this.providersRepository.findOne({
            where: {
                id
            },
            
            relations: {
                operations: true
            }
            
        });

        if(!providers)
            throw new HttpException('Provedor não encontrado!', HttpStatus.NOT_FOUND);

        return providers;
    }

    async findByName(corporate_name: string): Promise<Providers[]> {
        return await this.providersRepository.find({
            where: {
                corporate_name: ILike(`%${corporate_name}%`)
            },
            
            relations: {
                operations: true
            }

        })
    }

    async create(providers: Providers): Promise<Providers> {
        return await this.providersRepository.save(providers)
    }

    async update(providers: Providers): Promise<Providers> {

        let findProvider: Providers =  await this.findById(providers.id);

        if (!findProvider || !providers.id)
            throw new HttpException('Provedor não encontrado!', HttpStatus.NOT_FOUND);

        return await this.providersRepository.save(providers)
    }

    async delete(id: number): Promise<DeleteResult>{

        let findProvider = await this.findById(id);

        if (!findProvider)
            throw new HttpException('Provedor não encontrado!', HttpStatus.NOT_FOUND);

        return await this.providersRepository.delete(id)
    }
}