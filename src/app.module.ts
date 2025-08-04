import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env',
      }),
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => {
          const user = config.get<string>('MONGO_USER') ?? '';
          const pass = config.get<string>('MONGO_PASS') ?? '';
          const host = config.get<string>('MONGO_HOST');
          const port = config.get<string>('MONGO_PORT');
          const db = config.get<string>('MONGO_DB');
  
          const uri = `mongodb://${user}:${encodeURIComponent(
            pass,
          )}@${host}:${port}/${db}?authSource=admin`;
  
          return { uri };
        },
      }),
    ],
  })
export class AppModule {}
