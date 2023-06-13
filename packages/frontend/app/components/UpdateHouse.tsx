"use client"
import Modal from "@/app/components/Modal";
import React, {FormEventHandler, useState, useReducer, Dispatch} from "react";
import {updateHouse} from "@/api";
import {useRouter} from "next/navigation";
import {IHouse, IUpdateHouse} from "@/types/IHouse";
import {FiEdit} from "react-icons/fi";

interface Action {
    type: string;
    value: any;
}

export const UpdateReducer = (state: IUpdateHouse, action: Action): IUpdateHouse => {
    switch (action.type) {
        case "UPDATE_ADDRESS":
            return {...state, address: action.value};
        case "UPDATE_CURRENT_VALUE":
            return {...state, currentValue: Number(action.value)};
        case "UPDATE_LOAN_AMOUNT":
            return {...state, loanAmount: Number(action.value)};
        default:
            return state;
    }
};

interface UpdateHouseProps {
    id: number,
    house: IUpdateHouse
}

const UpdateHouse: React.FC<UpdateHouseProps> = ({id, house}) => {
    const router = useRouter();
    const [modalOpen, setModelOpen] = useState<boolean>(false);
    const [state, dispatch]: [IUpdateHouse, Dispatch<Action>] = useReducer(UpdateReducer, house);

    const handleSubmitNewHouse: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        //TODO add validation!!!

        const updates: IUpdateHouse = {};

        if(state.address) updates.address = state.address;
        if(state.currentValue || state.currentValue === 0) updates.currentValue = state.currentValue;
        if(state.loanAmount || state.loanAmount === 0) updates.loanAmount = state.loanAmount;


        try {
            const res = await updateHouse(id, updates);
            setModelOpen(false);
            router.refresh();
        } catch (e) {
            console.error(e);
            //TODO add server side validation + other error to react-toast
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const value = e.target.value;

        dispatch({type: type, value: value});
    };

    return (
        <div>
            <FiEdit cursor="pointer" className='text-blue-500' onClick={() => setModelOpen(true)} size={25}/>
            <Modal modalOpen={modalOpen} setModelClose={() => setModelOpen(false)}>
                <form onSubmit={handleSubmitNewHouse}>
                    <div className="modal-action flex flex-col w-full">
                        <div className="flex items-center w-full mb-4">
                            <h1 className="mx-auto font-bold text-lg">Update house {id}</h1>
                        </div>
                        <div className="flex items-center w-full mb-4">
                            <label htmlFor="address" className="w-40 mr-2 text-left">Address:</label>
                            <input
                                value={state.address}
                                onChange={(e) => handleChange(e, "UPDATE_ADDRESS")}
                                type="text"
                                id="address"
                                className="input input-bordered flex-grow"
                            />
                        </div>
                        <div className="flex items-center w-full mb-4">
                            <label htmlFor="currentValue" className="w-40 mr-2 text-left">Current Value:</label>
                            <input
                                value={state.currentValue}
                                onChange={(e) => handleChange(e, "UPDATE_CURRENT_VALUE")}
                                type="text"
                                id="currentValue"
                                className="input input-bordered flex-grow"
                            />
                        </div>
                        <div className="flex items-center w-full mb-4">
                            <label htmlFor="loanAmount" className="w-40 mr-2 text-left">Loan Amount:</label>
                            <input
                                value={state.loanAmount}
                                onChange={(e) => handleChange(e, "UPDATE_LOAN_AMOUNT")}
                                type="text"
                                id="loanAmount"
                                className="input input-bordered flex-grow"
                            />
                        </div>
                        <button className="btn btn-primary w-full" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default UpdateHouse;
