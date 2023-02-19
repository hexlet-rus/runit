import { DataSource } from 'typeorm';
import getDataSourceConfig from './config/data-source.config';

export const dataSource = new DataSource(getDataSourceConfig());
