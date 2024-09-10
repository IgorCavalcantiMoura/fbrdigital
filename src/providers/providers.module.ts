import { Module } from "@nestjs/common";
import { Providers } from "./entities/providers.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProviderService } from "./services/providers.service";
import { ProvidersController } from "./controllers/providers.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Providers])],
    providers: [ProviderService],
    controllers: [ProvidersController],
    exports: [TypeOrmModule]
})
export class ProvidersModule{}