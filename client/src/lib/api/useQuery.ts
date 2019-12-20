import { useState, useEffect, useCallback } from 'react'
import { server } from './server'
interface State<TData> {
    data: TData | null
    loading: boolean
}
export const useQuery = <TData = any>(query: string) => {
    const [state, setState] = useState<State<TData>>({
        data: null,
        loading: false
    })
    const fetch = useCallback(() => {
        const fetchApi = async () => {
            setState({ data: null, loading: true })
            const { data } = await server.fetch<TData>({
                query
            })
            setState({ data, loading: false })
        }
        fetchApi()
    }, [query])
    
    
    useEffect(() => {
        fetch()
    }, [query])

    return {...state, refetch: fetch }
}