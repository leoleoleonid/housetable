import {ICreateHouse, IHouse, IUpdateHouse} from "@/types/IHouse";

const baseUrl = 'http://localhost:1234';

// export const getTodoById = async (id: string): Promise<IHouse> => {
//     const res = await fetch(`${baseUrl}/tasks/${id}`);
//     const todos = await res.json();
//     return todos;
// }
//
// export const addNewTodo = async (task: IHouse): Promise<IHouse> => {
//     const res = await fetch(`${baseUrl}/tasks`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(task)
//     });
//     const newTodo = await res.json();
//     return newTodo;
// }


//TODO
export const updateHouse = async (id: number, house: IUpdateHouse): Promise<IHouse> => {
    const res = await fetch(`${baseUrl}/api/house/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(house)
    });
    const updateHouse = await res.json();
    return updateHouse;
}

export const createNewHouse = async (house: ICreateHouse): Promise<IHouse> => {
    const path = `${baseUrl}/api/house`
    const res = await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(house)
    });
    const newHouse = await res.json();
    return newHouse;
}


export const getHouse = async (id: number): Promise<IHouse> => {
    const path = `${baseUrl}/api/house/${id}`
    const res = await fetch(path);
    const newHouse = await res.json();
    console.log('getHouse', newHouse);
    return newHouse;
}


export const getAllHouses = async (): Promise<IHouse[]> => {
    const path = `${baseUrl}/api/house`
    const res = await fetch(path, {cache: 'no-store'});
    const newHouses = await res.json();
    return newHouses;
}


