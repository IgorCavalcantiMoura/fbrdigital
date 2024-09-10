import { ProvidersModule } from './../providers/providers.module';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Operations } from "./entities/operations.entities";
import { OperationsService } from "./services/operations.service";
import { OperationsController } from "./controllers/operations.controllers";
import { ProviderService } from '../providers/services/providers.service';

@Module({
    imports: [TypeOrmModule.forFeature([Operations]), ProvidersModule],
    providers: [OperationsService, ProviderService],
    controllers: [OperationsController],
    exports: [TypeOrmModule]
})

export class OperationsModule{}