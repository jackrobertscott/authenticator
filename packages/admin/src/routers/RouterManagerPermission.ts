import { createElement as create, FC, Fragment } from 'react'
import { useLocalRouter, Modal, Layout, IconBar } from 'wga-theme'
import { CreatePermission } from '../screens/CreatePermission'
import { UpdatePermission } from '../screens/UpdatePermission'
import { RemovePermission } from '../screens/RemovePermission'
import { ShowPermission } from '../screens/ShowPermission'

export const RouterManagerPermission: FC<{
  id?: string
  change?: (id?: string) => void
  visible?: boolean
  close: () => void
}> = ({ id, change, close, visible }) => {
  const router = useLocalRouter({
    nomatch: id ? '/inspect' : '/create',
    options: id
      ? [
          { key: '/inspect', children: create(ShowPermission, { id }) },
          {
            key: '/update',
            children: create(UpdatePermission, { id, change }),
          },
          {
            key: '/remove',
            children: create(RemovePermission, { id, change }),
          },
        ]
      : [{ key: '/create', children: create(CreatePermission, { change }) }],
  })
  return create(Modal, {
    close,
    visible,
    children: create(Layout, {
      grow: true,
      children: [
        create(IconBar, {
          key: 'iconBar',
          icons: id
            ? [
                {
                  icon: 'glasses',
                  label: 'Inspect',
                  focused: router.current.key === '/inspect',
                  click: () => router.change('/inspect'),
                },
                {
                  icon: 'sliders-h',
                  label: 'Update',
                  focused: router.current.key === '/update',
                  click: () => router.change('/update'),
                },
                {
                  icon: 'fire-alt',
                  label: 'Remove',
                  focused: router.current.key === '/remove',
                  click: () => router.change('/remove'),
                },
                {
                  icon: 'times-circle',
                  label: 'Close',
                  click: close,
                  prefix: 'far',
                  seperated: true,
                },
              ]
            : [
                {
                  icon: 'plus',
                  label: 'Create',
                  focused: router.current.key === '/create',
                  click: () => router.change('/create'),
                },
                {
                  icon: 'times-circle',
                  label: 'Close',
                  click: close,
                  prefix: 'far',
                  seperated: true,
                },
              ],
        }),
        router.current &&
          create(Fragment, {
            key: 'children',
            children: router.current.children,
          }),
      ],
    }),
  })
}
