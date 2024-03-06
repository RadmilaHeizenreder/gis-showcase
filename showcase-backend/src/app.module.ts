import { Module } from '@nestjs/common';
import { SubmissionModule } from './submission/submission.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolAddressModule } from './school-address/school-address.module';
import { SchoolAddressEntity } from './school-address/entities/school.entity';
import { SubmissionEntity } from './submission/entities/submission.entity';
import { SchoolRoutesModule } from './school-routes/school-routes.module';
import { SchoolRouteEntity } from './school-routes/entities/school-route.entity';

@Module({
  imports: [
    SubmissionModule,
    SchoolAddressModule,
    SchoolRoutesModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './../.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        // host: config.get<'string'>('TYPEORM_HOST'),
        username: config.get<string>('TYPEORM_USERNAME'),
        password: config.get<string>('TYPEORM_PASSWORD'),
        database: config.get<string>('TYPEORM_DATABASE'),
        port: config.get<number>('TYPEORM_PORT'),
        entities: [SchoolAddressEntity, SubmissionEntity, SchoolRouteEntity],
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
