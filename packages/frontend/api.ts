import {ICreateHouse, IHouse, IUpdateHouse} from "@/types/IHouse";

//TODO to config
const serverBaseUrl = process.env.NEXT_PUBLIC_BASE_API_URL_SERVER || 'http://backend:1234';
const clientBaseUrl = process.env.NEXT_PUBLIC_BASE_API_URL_CLIENT || 'http://localhost:1234';
const getBaseUrl = (): string => {
    if (typeof window !== 'undefined') {
       return clientBaseUrl;
    } else {
        return serverBaseUrl;
    }
}
export const updateHouse = async (id: number, house: IUpdateHouse): Promise<IHouse> => {
    const res = await fetch(`${getBaseUrl()}/api/house/${id}`, {
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
    const path = `${getBaseUrl()}/api/house`;
    try {
        const res = await fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(house)
        });
        const newHouse = await res.json();
        return newHouse;
    } catch (e) {
        console.log(e)
        throw e
    }
}


export const getHouse = async (id: number): Promise<IHouse> => {
    const path = `${getBaseUrl()}/api/house/${id}`
    const res = await fetch(path);
    const newHouse = await res.json();
    return newHouse;
}


export const getAllHouses = async (): Promise<IHouse[]> => {
    const path = `${getBaseUrl()}/api/house`
    const res = await fetch(path, {cache: 'no-store'});
    const newHouses = await res.json();
    return newHouses;
}


