import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONFIG } from '../config';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: CONFIG.DB_HOST,
      port: Number(CONFIG.DB_PORT),
      username: CONFIG.DB_USERNAME,
      password: CONFIG.DB_PASSWORD,
      database: CONFIG.DB_NAME,
      entities: [],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
