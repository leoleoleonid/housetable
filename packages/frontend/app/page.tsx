import AddHouse from "@/app/components/AddHouse";
import HousesList from "@/app/components/HouseList";
import {getAllHouses} from "@/api";

export default async function Home() {
    const houses = await getAllHouses();

    return (
        <main className="max-w-4xl mx-auto mt-4">
            <div className="text-center my-5 flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Houses app</h1>
                <AddHouse/>
            </div>
            <HousesList houses={houses}/>
        </main>
        )
}
