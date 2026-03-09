import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CrisisModule } from './crisis/crisis.module';


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
   
  ],
  controllers: [AppController],
  providers: [AppService],       
})
export class AppModule { }
