import { createElement as create, FC } from 'react'
import { css } from 'emotion'
import { useTheme } from '../contexts/Theme'
import { Icon } from './Icon'
import { Scroller } from './Scroller'

export const Menu: FC<{
  options: Array<{
    label: string
    helper?: string
    icon: string
    solid?: boolean
    click?: () => void
  }>
}> = ({ options }) => {
  const theme = useTheme()
  return create('div', {
    className: css({
      borderTop: theme.menu.border,
    }),
    children: create(Scroller, {
      maxheight: 340,
      border: theme.menu.border,
      children: options.map(({ label, helper, icon, solid, click }) => {
        return create('div', {
          key: label,
          onClick: click,
          className: css({
            all: 'unset',
            display: 'flex',
            transition: '200ms',
            cursor: 'pointer',
            padding: 15,
            flexGrow: 1,
            color: theme.menu.label,
            background: theme.menu.background,
            '&:not(:first-child)': {
              borderBottom: theme.menu.border,
            },
            '&:hover': {
              background: theme.menu.backgroundHover,
            },
          }),
          children: [
            create(Icon, {
              key: 'icon',
              icon,
              solid,
            }),
            create('div', {
              key: 'text',
              className: css({
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                marginLeft: 10,
              }),
              children: [
                create('div', {
                  key: 'label',
                  children: label,
                }),
                helper &&
                  create('div', {
                    key: 'helper',
                    children: helper,
                    className: css({
                      marginTop: 5,
                      color: theme.menu.helper,
                    }),
                  }),
              ],
            }),
          ],
        })
      }),
    }),
  })
}
