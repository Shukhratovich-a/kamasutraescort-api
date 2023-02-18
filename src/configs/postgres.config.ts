import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getPostgresConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'postgres',
    url: getPostgresString(configService),
    ...getPostgresOptions(),
  };
};

export const getPostgresString = (configService: ConfigService) =>
  configService.get('CONNECTION_TYPE') +
  '://' +
  configService.get('POSTGRES_USERNAME') +
  ':' +
  configService.get('POSTGRES_PASSWORD') +
  '@' +
  configService.get('POSTGRES_HOST') +
  ':' +
  configService.get('POSTGRES_PORT') +
  '/' +
  configService.get('POSTGRES_DATABASE');

const getPostgresOptions = () => ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoLoadEntities: true,
  synchronize: true,
});
