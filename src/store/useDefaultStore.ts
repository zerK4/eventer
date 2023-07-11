import { create } from "zustand";

export interface DefaultStore {
    loading: boolean;
    creationStep: 'stepOne' | 'stepTwo' | 'stepThree' | ''
    selectedOption: string;
}

export const useDefaultStore = create<DefaultStore>((set, get) => ({
    loading: false,
    creationStep: 'stepOne',
    selectedOption: ''
}))

export default useDefaultStore;