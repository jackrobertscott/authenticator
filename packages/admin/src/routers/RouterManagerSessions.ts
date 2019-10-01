import { createElement as create, FC } from 'react'
import { GadgetsIconbar } from '../templates/GadgetsIconbar'
import { RouterModal } from '../templates/RouterModal'
import { CreateSession } from '../screens/CreateSession'
import { RetrieveSession } from '../screens/RetrieveSession'
import { UpdateSession } from '../screens/UpdateSession'
import { RemoveSession } from '../screens/RemoveSession'

export type IRouterManagerSessions = {
  id?: string
  close?: () => void
  change?: () => void
}

export const RouterManagerSessions: FC<IRouterManagerSessions> = ({
  id,
  close,
  change,
}) => {
  return create(RouterModal, {
    close,
    visible: typeof id === 'string',
    children: create(GadgetsIconbar, {
      close,
      screens: id
        ? [
            {
              icon: 'history',
              label: 'Overview',
              children: create(RetrieveSession, {
                id,
              }),
            },
            {
              icon: 'cog',
              label: 'Update',
              children: create(UpdateSession, {
                id,
              }),
            },
            {
              icon: 'fire-alt',
              label: 'Danger Zone',
              children: create(RemoveSession, {
                id,
              }),
            },
          ]
        : [
            {
              icon: 'plus',
              label: 'Create',
              children: create(CreateSession, {
                change: () => {
                  if (close) close()
                  if (change) change()
                },
              }),
            },
          ],
    }),
  })
}
