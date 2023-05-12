import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import * as path from "path";
import {GraphQLModule} from "@nestjs/graphql";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: path.resolve(__dirname, '..', '..', '.env')
        }),
        GraphQLModule.forRoot({
            autoSchemaFile: 'schema.gql',
            sortSchema: true,
            playground: true,
        }),//code first
        TypeOrmModule.forRootAsync({
            imports: [ ConfigModule ],
            inject: [ ConfigService ],

            useFactory: async (config: ConfigService) => ({

                type: config.get<'aurora-data-api'>('TYPEORM_CONNECTION'),
                username: config.get<string>('TYPEORM_USERNAME'),
                host: config.get<string>('TYPEORM_HOST'),
                password: config.get<string>('TYPEORM_PASSWORD'),
                database: config.get<string>('TYPEORM_DATABASE'),
                port: config.get<number>('TYPEORM_PORT'),
                entities: [ __dirname + 'dist/**/*.entity{.ts,.js}'],
                synchronize: true,
                autoLoadEntities: true,
                logging: true,
            }),
        }),
        UsersModule,
    ]
})
export class AppModule {
}
