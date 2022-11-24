import { useCallback } from 'react';
import { toast } from "react-toastify";

function useToast() {

    return useCallback((message, type) => {
        toast[type](message);
    }
        , []);


}

export default useToast