import {IHouse} from "@/types/IHouse";
import React from "react";
import HouseRow from "@/app/components/HouseRow";

interface HouseListProps {
    houses : IHouse[];
}
const HouseList: React.FC<HouseListProps> = ({houses}) => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Address</th>
                    <th>CurrentValue</th>
                    <th>LoanAmount</th>
                    <th>Risk</th>
                </tr>
                </thead>
                <tbody>
                {houses.map(house => <HouseRow key={house.id} house={house}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default HouseList;