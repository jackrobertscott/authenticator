import { createElement as create, FC } from 'react'
import { Focus, Button, useMedia, Root, Toaster } from 'wga-theme'
import { useGadgets } from '../hooks/useGadgets'
import { useUniversal } from '../hooks/useUniversal'
import { useSetup } from '../hooks/useSetup'
import { RouterCentral } from './RouterCentral'
import { Loading } from './Loading'
import { wga } from '../utils/wga'
import { usePreferences } from '../utils/preferences'

export const Admin: FC = () => {
  useSetup()
  const gadgets = useGadgets()
  const universal = useUniversal()
  const preferences = usePreferences()
  const media = useMedia()
  return create(Root, {
    theme: preferences.theme,
    children: create(Toaster, {
      children: !Boolean(gadgets.ready && universal.ready)
        ? create(Loading)
        : !Boolean(gadgets.bearer && gadgets.user)
        ? create(Focus, {
            icon: 'unlock',
            label: 'Welcome',
            helper: 'Get started with Authpack login system',
            children: create(Button, {
              key: 'login',
              icon: 'bolt',
              label: 'Continue',
              click: () => wga.show(),
            }),
          })
        : !Boolean(gadgets.team)
        ? create(Focus, {
            icon: 'users',
            label: 'Team Required',
            helper: 'Please create a team to get started',
            children: create(Button, {
              key: 'team',
              label: 'Continue',
              click: () => wga.show(),
            }),
          })
        : !Boolean(universal.cluster_id && universal.cluster_key_client)
        ? create(Loading)
        : media.width < 1120
        ? create(Focus, {
            icon: 'expand-arrows-alt',
            label: 'Dashboard',
            helper: 'Use a wider screen to see dashboard',
            children: create(Button, {
              label: 'Okay',
              click: () => wga.show(),
            }),
          })
        : create(RouterCentral, {
            key: 'router',
          }),
    }),
  })
}
