import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CrisisModule } from './crisis/crisis.module';
import { ZonesModule } from './zones/zones.module';
import { ReportsModule } from './reports/reports.module';
import { MediaModule } from './media/media.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI!, {
      connectionFactory: (connection) => {
        console.log('✅ MongoDB connected:', connection.name);
        return connection;
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    CrisisModule,
    ZonesModule,
    ReportsModule,
    MediaModule,


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
