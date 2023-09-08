import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./modules/users/users.module";
import { ENTITIES } from "./entities";
import { CONFIG } from "../config";
import { AuthModule } from "./modules/auth/auth.module";
import { ProductsModule } from "./modules/products/products.module";
import { migrations } from "./migration";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: CONFIG.DB_HOST,
      port: Number(CONFIG.DB_PORT),
      username: CONFIG.DB_USERNAME,
      password: CONFIG.DB_PASSWORD,
      database: CONFIG.DB_NAME,
      entities: ENTITIES,
      synchronize: true,
      migrationsTableName: "migrations",
      migrationsRun: true,
      migrations: migrations,
      subscribers: []
    }),
    UsersModule,
    AuthModule,
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
