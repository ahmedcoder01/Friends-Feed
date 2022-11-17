import React, { useCallback, useState } from 'react'
import { globalInstance } from '../axios/axiosInstances'

function useHTTP({ path, method }) {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false);


    const fetchData = useCallback(async (data = null) => {
        setLoading(true);
        setError(null);

        try {


            const req = await globalInstance({
                method,
                url: path,
                data

            });

            setResponse(req.data);
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }, [path])

    return { response, error, loading, fetchData, setError }
}

export default useHTTP