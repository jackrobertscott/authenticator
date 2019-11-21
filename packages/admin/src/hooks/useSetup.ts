import { useEffect } from 'react'
import { useGadgets } from './useGadgets'
import { createUseServer } from './useServer'
import { UniversalStore } from '../utils/universal'

export const useSetup = () => {
  const gadgets = useGadgets()
  const gqlGetCluster = useGetCluster()
  useEffect(() => {
    UniversalStore.reset()
    if (gadgets.bearer && gadgets.team && gadgets.team.id) {
      gqlGetCluster.fetch().then(({ cluster }) => {
        UniversalStore.update({
          ready: true,
          cluster_id: cluster.id,
          cluster_name: cluster.name,
          cluster_domain_key: cluster.key_domain,
          subscribed: cluster.subscribed,
          power: cluster.power,
          theme: cluster.theme,
        })
      })
    } else {
      setTimeout(() => UniversalStore.update({ ready: true }))
    }
    // eslint-disable-next-line
  }, [gadgets.bearer, gadgets.team && gadgets.team.id])
}

const useGetCluster = createUseServer<{
  cluster: {
    id: string
    name: string
    theme: string
    subscribed: boolean
    power: boolean
    key_domain: string
  }
}>({
  query: `
    query wgaGetCluster($id: String) {
      cluster: wgaGetCluster(id: $id) {
        id
        name
        theme
        subscribed
        power
        key_domain
      }
    }
  `,
})
