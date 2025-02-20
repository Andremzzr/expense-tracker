import { IExpense } from "./IExpense";

export interface IDatabaseService {
    getExpense(id: number): Promise<IExpense | undefined>;
    createExpense(expense: Omit<IExpense, "id">): Promise<boolean>;
    updateExpense(id: number, expense: Partial<Omit<IExpense, "id">>): Promise<boolean>;
    deleteExpense(id: number): Promise<boolean>;
}