
//TODO to common @lib for backend and frontend
export interface IHouse {
    id: number;
    address: string | undefined;
    currentValue: number | undefined;
    loanAmount: number | undefined;
    risk: number | undefined;
}

export type ICreateHouse = Omit<IHouse, 'id' | 'risk'>
export type IUpdateHouse = Partial<ICreateHouse>
