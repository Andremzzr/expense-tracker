import { FilterOption } from "../interfaces/FilterOption";
import { IDatabaseService } from "../interfaces/IDatabaseService";
import { IExpense } from "../interfaces/IExpense";
import { IUser } from "../interfaces/IUser";
import { Pool } from 'pg';

const pool = new Pool({
  user: 'user',
  password: 'pass',
  host: 'localhost',
  port: 5432,
  database: 'database'
});



function getFilterQuery( filter: FilterOption) {
  let filterQuery = "";
  switch (filter) {
    case FilterOption.PastWeek:
      const currentDate = new Date();

      const pastWeek = new Date(currentDate.setDate(currentDate.getDate() - 7));
      
      filterQuery = `and date > '${pastWeek.toISOString()}'::timestamptz`
      
      break;
    case FilterOption.LastMonth:
      const month = (new Date()).getMonth() + 1
      filterQuery = `and MONTH(date) > ${pastWeek}`
      break;
    default:
      break;
  }

  return filterQuery
}


export class PgSqlService implements IDatabaseService {
    connector: any;
  
    constructor(connector: any) {
      this.connector = connector;
    }
  
    async getExpense(id: number, userid: number): Promise<IExpense | undefined> {
      const result = await this.connector.query('SELECT * FROM expenses WHERE id = $1 and userid = $2', [id, userid]);
      return result.rows[0] || undefined;
    }

    async getExpenses(userid: number, filter: FilterOption | undefined = undefined): Promise<IExpense | undefined> {
      let filterQuery: string = "";
      if ( filter ) {
        filterQuery = getFilterQuery(filter)
      }
      console.log(filterQuery)
      const result = await this.connector.query(`SELECT * FROM expenses WHERE  userid = $1 ${filterQuery}`, [userid]);
      return result.rows || [];
    }
  
    async createExpense(expense: Omit<IExpense, "id">): Promise<boolean> {
      const result = await this.connector.query(
        'INSERT INTO expenses (value, description, date, userid) VALUES ($1, $2, $3, $4) RETURNING id',
        [expense.value, expense.description, expense.date, expense.userid]
      );
      return result.rowCount > 0;
    }
  
    async updateExpense(id: number, expense: Partial<Omit<IExpense, "id">>, userid: number): Promise<boolean> {
      const fields = Object.keys(expense).map((key, index) => `${key} = $${index + 3}`).join(', ');
      const values = Object.values(expense);
      if (fields.length === 0) return false;
      
      const result = await this.connector.query(
        `UPDATE expenses SET ${fields} WHERE id = $1 and userid = $2 RETURNING id`,
        [id, userid, ...values]
      );
      return result.rowCount > 0;
    }
  
    async deleteExpense(id: number, userid: number): Promise<boolean> {
      const result = await this.connector.query('DELETE FROM expenses WHERE id = $1 and userid = $2', [id, userid]);
      return result.rowCount > 0;
    }

    async createUser(user: IUser): Promise<boolean> {
      const result = await this.connector.query(
        'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING id',
        [user.username, user.password]
      );

      return result.rowCount > 0;
    }

    async getUser(user: IUser): Promise<IUser | undefined> {
      const result = await this.connector.query(
        'SELECT * from users WHERE name = $1',
        [user.username]
      );
      return result.rows[0] || undefined;
    }
  }


const databaseService = new PgSqlService(pool);

module.exports = { databaseService }