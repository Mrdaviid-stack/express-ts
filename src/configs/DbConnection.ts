import { knex } from 'knex';
import configs from '../../knexfile';

const config = configs[process.env.NODE_ENV || 'development']; 

const DB = knex(config)

export default DB;
