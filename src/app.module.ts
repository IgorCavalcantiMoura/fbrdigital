import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Providers } from './providers/entities/providers.entity';
import { ProvidersModule } from './providers/providers.module';
import { Operations } from './operations/entities/operations.entities';
import { OperationsModule } from './operations/operations.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: "db_fbr",
      entities: [Providers, Operations],
      synchronize: true,
    }),
    ProvidersModule,
    OperationsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
