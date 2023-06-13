"use client"
import {AiOutlinePlus} from "react-icons/ai";
import Modal from "@/app/components/Modal";
import {FormEventHandler, useState, useReducer, Dispatch} from "react";
import {createNewHouse} from "@/api";
import {useRouter} from "next/navigation";
import {ICreateHouse} from "@/types/IHouse";

interface Action {
    type: string;
    value: any;
}


export const initialState: ICreateHouse = {
    address: "",
    currentValue: undefined,
    loanAmount: undefined,
} as ICreateHouse;

export const AppReducer = (state: ICreateHouse, action: Action): ICreateHouse => {
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

const AddHouse = () => {
    const router = useRouter();
    const [modalOpen, setModelOpen] = useState<boolean>(false);
    const [state, dispatch]: [ICreateHouse, Dispatch<Action>] = useReducer(AppReducer, initialState);

    const handleSubmitNewHouse: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        //TODO add validation!!!

        const newHouse: ICreateHouse = {
            address: state.address,
            currentValue: state.currentValue,
            loanAmount: state.loanAmount,
        };

        const res = await createNewHouse(newHouse);
        console.log(res);
        try {
            setModelOpen(false);
        } catch (e) {
            console.error(e);
            //TODO add server side validation + other error to react-toast
        }
        router.refresh();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const value = e.target.value;

        dispatch({type: type, value: value});
    };

    return (
        <div>
            <button onClick={() => setModelOpen(true)} className="btn btn-primary w-full">
                Add new house
                <AiOutlinePlus className="ml-2" size={18}/>
            </button>

            <Modal modalOpen={modalOpen} setModelClose={() => setModelOpen(false)}>
                <form onSubmit={handleSubmitNewHouse}>
                    <div className="modal-action flex flex-col w-full">
                        <div className="flex items-center w-full mb-4">
                            <h1 className="mx-auto font-bold text-lg">Add new house</h1>
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

export default AddHouse;
