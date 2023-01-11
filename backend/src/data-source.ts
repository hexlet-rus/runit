import { DataSource } from 'typeorm';
import getDataSourceConfig from './data-source.config';

export const dataSource = new DataSource(getDataSourceConfig());
