import { IExpense } from "./IExpense";

export interface IDatabaseService {
    getExpense(id: number, userid: number): Promise<IExpense | undefined>;
    createExpense(expense: Omit<IExpense, "id">): Promise<boolean>;
    updateExpense(id: number, expense: Partial<Omit<IExpense, "id">>, userid: number): Promise<boolean>;
    deleteExpense(id: number, userid: number): Promise<boolean>;
}