import { useMemo, ReactNode, useEffect } from 'react'
import { useStore } from './useStore'

export const useLocalRouter = ({
  local,
  nomatch,
  options,
}: {
  local: string
  nomatch?: string
  options: Array<{
    key: string
    children: ReactNode
  }>
}) => {
  const store = useStore<undefined | { key: string; children: ReactNode }>({
    key: local,
    initial: options[0],
  })
  useEffect(() => {
    const list = options.filter(i => store.state && store.state.key === i.key)
    if (store.change && list[0] !== store.state) {
      if (list.length) store.change(list[0])
      else if (nomatch) change(nomatch)
    }
  }, [store.state, options.map(option => option.key).join()])
  const change = (key: string) => {
    const list = options.filter(i => i.key === key)
    if (store.change) store.change(list.length ? list[0] : undefined)
  }
  const factory = () => ({
    current: store.state,
    change,
  })
  return useMemo(factory, [store.state])
}
