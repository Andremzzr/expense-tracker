import { IDatabaseService } from "../interfaces/IDatabaseService";
import { IExpense } from "../interfaces/IExpense";

export class PgSqlService implements IDatabaseService {
    connector: any;
  
    constructor(connector: any) {
      this.connector = connector;
    }
  
    async getExpense(id: number): Promise<IExpense | undefined> {
      const result = await this.connector.query('SELECT * FROM expenses WHERE id = $1', [id]);
      return result.rows[0] || undefined;
    }
  
    async createExpense(expense: Omit<IExpense, "id">): Promise<boolean> {
      const result = await this.connector.query(
        'INSERT INTO expenses (value, description, date, userid) VALUES ($1, $2, $3, $4) RETURNING id',
        [expense.value, expense.description, expense.date, expense.userid]
      );
      return result.rowCount > 0;
    }
  
    async updateExpense(id: number, expense: Partial<Omit<IExpense, "id">>): Promise<boolean> {
      const fields = Object.keys(expense).map((key, index) => `${key} = $${index + 2}`).join(', ');
      const values = Object.values(expense);
      if (fields.length === 0) return false;
      
      const result = await this.connector.query(
        `UPDATE expenses SET ${fields} WHERE id = $1 RETURNING id`,
        [id, ...values]
      );
      return result.rowCount > 0;
    }
  
    async deleteExpense(id: number): Promise<boolean> {
      const result = await this.connector.query('DELETE FROM expenses WHERE id = $1', [id]);
      return result.rowCount > 0;
    }
  }