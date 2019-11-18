import { createElement as create, FC, ReactNode, useRef } from 'react'
import { css } from 'emotion'
import { useTheme } from '../hooks/useTheme'
import { Portal } from './Portal'
import { Toaster } from './Toaster'

export const Modal: FC<{
  id?: string
  children: ReactNode
  visible?: boolean
  close?: () => void
  width?: number
  height?: number
}> = ({ id, children, visible = true, close, width = 810, height = 560 }) => {
  const theme = useTheme()
  const unfocused = useRef<boolean>(!document.querySelector(':focus-within'))
  return create(Portal, {
    id,
    children: create('div', {
      onClick: event => {
        if (close && event.target === event.currentTarget && unfocused.current)
          close()
        else unfocused.current = !document.querySelector(':focus-within')
      },
      className: css({
        all: 'unset',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
        transition: '200ms',
        pointerEvents: visible ? 'all' : 'none',
        opacity: visible ? 1 : 0,
        background: theme.modal.cover,
      }),
      children: create('div', {
        children: !visible
          ? null
          : create(Toaster, {
              children,
            }),
        className: css({
          all: 'unset',
          display: 'flex',
          overflow: 'hidden',
          position: 'relative',
          width,
          height,
          background: theme.modal.background,
          boxShadow: theme.modal.shadow,
          border: theme.modal.border,
          borderRadius: theme.global.radius,
          [`@media (max-width: ${width + 50}px), (max-height: ${height +
            50}px)`]: {
            width: '100%',
            height: '100%',
            flexGrow: 1,
            borderRadius: 0,
            border: 'none',
          },
        }),
      }),
    }),
  })
}
