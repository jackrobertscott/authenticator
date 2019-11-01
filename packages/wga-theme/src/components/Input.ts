import OutsideClickHandler from 'react-outside-click-handler'
import {
  createElement as create,
  FC,
  ReactNode,
  useRef,
  useEffect,
} from 'react'
import { useTheme } from '../contexts/Theme'
import { css } from 'emotion'
import { Icon } from './Icon'

export const InputContainer: FC<{
  children: ReactNode
  disabled?: boolean
}> = ({ children, disabled }) => {
  const theme = useTheme()
  return create('div', {
    children,
    className: css({
      all: 'unset',
      display: 'flex',
      alignItems: 'center',
      transition: '200ms',
      position: 'relative',
      flexGrow: 1,
      fontSize: theme.global.fonts,
      borderRadius: theme.global.radius,
      background: disabled
        ? theme.input.backgroundDisabled
        : theme.input.background,
      border: theme.input.border,
      color: theme.input.value,
      '&:hover, &:focus-within': !disabled && {
        background: theme.input.backgroundHover,
        boxShadow: theme.input.shadow,
        color: theme.input.valueHover,
      },
    }),
  })
}

export const InputPopover: FC<{
  close: () => void
  children: ReactNode
}> = ({ close, children }) => {
  const theme = useTheme()
  const element = useRef()
  useEffect(() => {
    const input: any =
      element.current && (element.current as any).querySelector('input')
    if (input) input.focus()
  }, [])
  return create(OutsideClickHandler, {
    onOutsideClick: close,
    children: create('div', {
      children,
      ref: element,
      className: css({
        all: 'unset',
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        flexGrow: 1,
        left: 0,
        right: 0,
        top: 0,
        zIndex: 100,
        marginBottom: 25,
        overflow: 'hidden',
        borderRadius: theme.global.radius,
        background: theme.input.background,
        boxShadow: theme.input.shadow,
        border: theme.input.border,
      }),
    }),
  })
}

export const InputOption: FC<{
  icon: string
  solid?: boolean
  label: string
  helper?: string
  click: (value: string) => void
  reverse?: boolean
}> = ({ icon, solid, label, helper, click, reverse }) => {
  const theme = useTheme()
  return create('div', {
    onClick: click,
    className: css({
      all: 'unset',
      display: 'flex',
      flexDirection: reverse ? 'row-reverse' : 'row',
      transition: '200ms',
      cursor: 'pointer',
      padding: 15,
      flexGrow: 1,
      color: theme.input.label,
      borderTop: theme.input.border,
      background: reverse
        ? theme.input.backgroundDisabled
        : theme.input.background,
      '&:hover': {
        background: theme.input.backgroundHover,
      },
    }),
    children: [
      create('div', {
        key: 'text',
        className: css({
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          marginRight: reverse ? 0 : 10,
          marginLeft: reverse ? 10 : 0,
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
                color: theme.input.helper,
              }),
            }),
        ],
      }),
      create(Icon, {
        key: 'icon',
        icon,
        solid,
        padding: 1,
      }),
    ],
  })
}