import { createElement as create, FC, Fragment } from 'react'
import { useLocalRouter, Layout, IconBar } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { RouterSideBarUser } from './RouterSideBarUser'
import { RouterSideBarTeam } from './RouterSideBarTeam'
import { LogoutUser } from './LogoutUser'
import { ReconcileUser } from './ReconcileUser'

export const RouterModalOnauthed: FC<{
  close: () => void
}> = ({ close }) => {
  const settings = useSettings()
  const nomatch =
    !settings.user || !settings.user.verified
      ? '/verify'
      : settings.enable_teams && settings.prompt_teams && !settings.team
      ? '/teams'
      : '/users'
  const router = useLocalRouter({
    name: nomatch === '/users' ? 'onauthed' : undefined,
    nomatch,
    options: !settings.user
      ? []
      : [
          {
            key: '/users',
            children: create(RouterSideBarUser),
          },
          {
            key: '/teams',
            children: create(RouterSideBarTeam),
          },
          {
            key: '/logout',
            nosave: true,
            children: create(LogoutUser),
          },
          {
            key: '/verify',
            nosave: true,
            children: create(ReconcileUser, {
              email: settings.user.email,
            }),
          },
        ],
  })
  if (!settings.bearer || !settings.user) return null
  return create(Layout, {
    grow: true,
    children: [
      create(IconBar, {
        key: 'iconBar',
        icons: [
          {
            icon: 'user-circle',
            label: 'User',
            focused: router.current && router.current.key.startsWith('/users'),
            click: () => router.change('/users'),
          },
          settings.enable_teams && {
            icon: 'users',
            label: 'Team',
            focused: router.current && router.current.key.startsWith('/teams'),
            click: () => router.change('/teams'),
          },
          {
            icon: 'power-off',
            label: 'Logout',
            focused: router.current && router.current.key === '/logout',
            click: () => router.change('/logout'),
          },
          !settings.user.verified && {
            icon: 'exclamation-circle',
            label: 'Verify Email',
            focused: router.current && router.current.key === '/verify',
            click: () => router.change('/verify'),
            seperated: true,
          },
          {
            icon: 'times-circle',
            label: 'Close',
            click: close,
            prefix: 'far',
            seperated: !!settings.user.verified,
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