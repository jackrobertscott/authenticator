import { createElement as create, FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Modal } from 'wga-theme'
import { usePortal } from '../hooks/usePortal'

export type IRouterModal = {
  children: ReactNode
  close?: () => void
  visible: boolean
}

export const RouterModal: FC<IRouterModal> = ({ children, close, visible }) => {
  const portal = usePortal({ id: 'portals' })
  const modal = create(Modal.Container, {
    click: close,
    children,
    visible,
  })
  return portal.element ? createPortal(modal, portal.element) : null
}
