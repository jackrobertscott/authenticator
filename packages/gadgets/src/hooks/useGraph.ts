import { useState, useMemo, useEffect } from 'react'
import { chat } from '../utils/server'

export const createUseGraph = <T>({ query }: { query: string }) => (
  variables?: { [key: string]: any },
  operationName?: string
) => {
  const data = useGraph<T>({ query })
  useEffect(() => {
    if (variables) data.fetch(variables, operationName)
    // eslint-disable-next-line
  }, [])
  return data
}

export const useGraph = <T>({
  query,
}: {
  query: string
}): {
  data: T | undefined
  loading?: boolean
  error?: Error
  fetch: (
    variables?: { [key: string]: any },
    operationName?: string
  ) => Promise<T>
} => {
  const [data, dataChange] = useState<T | undefined>()
  const [loading, loadingChange] = useState<boolean>()
  const [error, errorChange] = useState<Error | undefined>()
  const fetch = (
    variables?: { [key: string]: any },
    operationName?: string
  ) => {
    loadingChange(true)
    errorChange(undefined)
    return chat({
      query,
      variables,
      operationName,
    })
      .then((done: any) => {
        if (done && done.error) throw done
        dataChange(done)
        errorChange(undefined)
        loadingChange(false)
        return done as T
      })
      .catch((caught: Error) => {
        errorChange(caught)
        loadingChange(false)
        throw caught
      })
  }
  // eslint-disable-next-line
  return useMemo(() => ({ data, loading, error, fetch }), [
    data,
    loading,
    error,
  ])
}