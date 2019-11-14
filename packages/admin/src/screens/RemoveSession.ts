import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { createUseServer } from '../hooks/useServer'
import { ConfirmRemove } from '../templates/GadgetsRemove'
import { useUniversal } from '../hooks/useUniversal'

export const RemoveSession: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const universal = useUniversal()
  const gqlRemoveSession = useRemoveSession()
  return create(Gadgets, {
    title: 'Remove Session',
    subtitle: universal.appname,
    children: create(ConfirmRemove, {
      helper: 'Permanently remove this session',
      alert: 'Please confirm the removal of this session',
      change: () =>
        gqlRemoveSession.fetch({ id }).then(() => change && change()),
    }),
  })
}

const useRemoveSession = createUseServer<{
  session: {
    id: string
  }
}>({
  query: `
    mutation apiRemoveSession($id: String!) {
      session: apiRemoveSession(id: $id) {
        id
      }
    }
  `,
})