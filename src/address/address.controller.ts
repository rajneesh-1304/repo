import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { AddressService } from "./address.service";
import { Address } from "./DTO/address";

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  getAddress(@Query() query: any) {
    return this.addressService.getAddress(query);
  }

  @Post()
  addAddress(@Body() addressData: Address) {
    return this.addressService.addAddress(addressData);
  }
}