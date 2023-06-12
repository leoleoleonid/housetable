import {getHouse} from "@/api";
import React from "react";

export default async function House({params}: {params: {id: string /*TODO to number*/}}) {
    const house = await getHouse(Number(params.id));

    return (
        <main className="max-w-4xl mx-auto mt-4 flex justify-center w-ful flex flex-col">
            <div className="flex items-center w-full mb-4">
                <h1 className="mx-auto font-bold text-lg">House Details</h1>
            </div>
            <div className="stats shadow  min-w-full" >
                <div className="overflow-x-auto">
                    <table className="table">

                        <tbody>
                            <tr>
                                <td>Id</td>
                                <td>{house.id}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>{house.address}</td>
                            </tr>
                            <tr>
                                <td>CurrentValue</td>
                                <td>{house.currentValue}</td>
                            </tr>
                            <tr>
                                <td>LoanAmount</td>
                                <td>{house.loanAmount}</td>
                            </tr>
                            <tr>
                                <td>Risk</td>
                                <td>{house.risk}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}
