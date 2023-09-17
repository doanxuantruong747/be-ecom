import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Roles } from "src/decorator/role.decorator";
import { Role } from "src/config/role";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Roles(Role.CLIENT_USER)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }
}
