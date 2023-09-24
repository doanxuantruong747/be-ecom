import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Roles } from "src/decorator/role.decorator";
import { Role } from "src/config/role";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { generateFilename } from "src/utils/helper";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles(Role.SUPER_USER)
  @UseInterceptors(
    FileInterceptor("images", {
      storage: diskStorage({
        destination: "./public/images/",
        filename: (req, file, cb) => generateFilename(req, file, cb)
      })
    })
  )
  @Post("/create")
  create(@UploadedFile() images, @Body() body: any) {
    console.log("array images", images);
    //return this.productsService.create();
  }
}
