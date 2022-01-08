import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PartnersController } from './partners/partners.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnersModule } from './partners/partners.module';
import { PartnersService } from './partners/partners.service';
import { configService } from './config/config.service';
import { LessonsModule } from './lessons/lessons.module';
import { LessonsService } from './lessons/lessons.service';
import { ChannelsModule } from './channels/channels.module';
import { ChannelsService } from './channels/channels.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    PartnersModule,
    LessonsModule,
    ChannelsModule,
  ],
  controllers: [AppController],
  //providers: [AppService, PartnersService],
  providers: [AppService, PartnersService, LessonsService, ChannelsService],
})
export class AppModule {}
