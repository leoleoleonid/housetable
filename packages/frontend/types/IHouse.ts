
//TODO to common @lib for backend and frontend
export interface IHouse {
    id: number;
    address: string;
    currentValue: number;
    loanAmount: number;
    risk: number;
}

export type ICreateHouse = Omit<IHouse, 'id' | 'risk'>
export type IUpdateHouse = Partial<ICreateHouse>
