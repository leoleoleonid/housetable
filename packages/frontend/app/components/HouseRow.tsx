import React from "react";
import {IHouse} from "@/types/IHouse";
import {AiFillEye} from "react-icons/ai";
import Link from "next/link";
import UpdateHouse from "@/app/components/UpdateHouse";

interface HouseRowProps {
    house: IHouse
}

const HouseRow: React.FC<HouseRowProps> = ({house}) => {
    return (
        <tr key={house.id}>
            <td>{house.id}</td>
            <td>{house.address}</td>
            <td>{house.currentValue}</td>
            <td>{house.loanAmount}</td>
            <td>{house.risk}</td>
            <td>
                <UpdateHouse id={house.id}/>
            </td>
            <td>
                <Link href={String(house.id)}>
                    <AiFillEye  className='text-blue-500' size={25}/>
                </Link>
            </td>
        </tr>
    )
}

export default HouseRow;