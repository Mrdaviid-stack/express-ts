import knex, { Knex } from 'knex';
import DB from '../../configs/DbConnection';

export class BaseModel {
  protected db: Knex;
  protected query: Knex;
  protected table: string;
  protected primaryKey: string;
  protected defaultOrder: string;

  constructor({table, primaryKey, defaultOrder}: any) {

    this.db = DB;
    // @ts-expect-error
    this.query = () => DB(table)
    this.table = table;
    this.primaryKey = primaryKey;
    this.defaultOrder = defaultOrder;

  }
  
  async findAll(page: number = 1, limit: number = 10): Promise<any> {
    const query = await this.query()
      .orderBy(this.defaultOrder, 'desc')
      .limit(limit)
      .offset(page - (limit * 1))

    return query;
  }

  async find(id: string): Promise<any> {
    const query = this.query()
      .where({ [this.primaryKey]: id })
      .first()

    return query;
  }

  async insert(data: any, returnColumn: any): Promise<any> {
    const query = await this.query()
      .insert(data)
      .returning('*');

    return query;
  }

  async update(id: string, data: any): Promise<any> {
    const query = await this.query()
      .where({ [this.primaryKey]: id })
      .update(data)
      .returning('*');

    return query;
  }

  async delete(id: string) {
    const query = await this.query()
      .where({ [this.primaryKey]: id })
      .delete();

    return query;
  }

}
