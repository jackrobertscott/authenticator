import { createElement as create, FC, Fragment } from 'react'
import { useRouter, SideBar } from 'wga-theme'
import { useUniversal } from '../hooks/useUniversal'
import { ListPermissions } from '../screens/ListPermissions'
import { ListProviders } from '../screens/ListProviders'

export const RouterSideBarCustomize: FC = () => {
  const config = useUniversal()
  const router = useRouter({
    base: '/customize',
    nomatch: '/providers',
    options: [
      { path: '/providers', children: create(ListProviders) },
      { path: '/permissions', children: create(ListPermissions) },
    ],
  })
  return create(Fragment, {
    children: [
      create(SideBar, {
        key: 'sideBar',
        title: 'Customize',
        footer: config.appname,
        options: [
          {
            icon: 'handshake',
            label: 'Providers',
            click: () => router.change('/providers'),
          },
          {
            icon: 'user-shield',
            label: 'Permissions',
            click: () => router.change('/permissions'),
          },
        ],
      }),
      router.current &&
        create(Fragment, {
          key: 'children',
          children: router.current.children,
        }),
    ],
  })
}