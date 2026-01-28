import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Address } from "./address.entity";

@Injectable()
export class AddressService {
    constructor(private readonly dataSource: DataSource) { }

    async addAddress(data) {
        const addressRepo = this.dataSource.getRepository(Address);
        await addressRepo.save(data);
        return { message: "Address added successfully!" };
    }

    async getAddress(query: any) {
        const addressRepo = this.dataSource.getRepository('Address');
        if (query?.userId) {
            return addressRepo.find({
                where: { userId: Number(query.userId) },
            });
        }
        return await addressRepo.find();
    }

}