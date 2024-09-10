import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Providers } from "../../providers/entities/providers.entity";

@Entity({name: "tb_operations"})
export class Operations {
     
    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    service_type: string

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    bandwidth: string

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    sla: string

    @IsNotEmpty()
    @Column({nullable: false})
    price: number

    @ManyToOne(() => Providers, (providers) => providers.operations, {
        onDelete: "CASCADE"
    })
    providers: Providers
}