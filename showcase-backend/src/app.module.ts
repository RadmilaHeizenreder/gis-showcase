import { Module } from '@nestjs/common';
import { SubmissionModule } from './submission/submission.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolAddressModule } from './school-address/school-address.module';
import { SchoolAddressEntity } from './school-address/entities/school.entity';
import { Submission } from './submission/entities/submission.entity';

@Module({
  imports: [
    SubmissionModule,
    SchoolAddressModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres', //config.get<'aurora-data-api'>('TYPEORM_CONNECTION'),
        username: config.get<string>('TYPEORM_USERNAME'),
        password: config.get<string>('TYPEORM_PASSWORD'),
        database: config.get<string>('TYPEORM_DATABASE'),
        port: config.get<number>('TYPEORM_PORT'),
        // entities: [__dirname + 'dist/**/*.entity{.ts, .js'],
        entities: [SchoolAddressEntity, Submission],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
        connectTimeoutMS: 50000,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
