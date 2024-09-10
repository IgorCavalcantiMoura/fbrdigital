import { IsNotEmpty } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Operations } from "../../operations/entities/operations.entities"

@Entity({name: "tb_providers"})
export class Providers {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    cnpj: string

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    fantasy_name: string

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    corporate_name: string

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    headquarters_adress: string

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    legal_representative_contact: string

    @IsNotEmpty()
    @Column({nullable: false})
    ranking_score: number

    @OneToMany(() => Operations, (operations) => operations.providers)
    operations: Operations
}