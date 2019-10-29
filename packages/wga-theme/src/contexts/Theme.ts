import { createContext, useContext } from 'react'

interface IKeys {
  [key: string]: any
}

export interface ITheme extends IKeys {
  global: {
    radius: number
    fonts: number
  }
  buttons: {
    label: string
    labelHover: string
    labelDisabled: string
    background: string
    backgroundMinor: string
    backgroundDisabled: string
    backgroundHover: string
    border: string
  }
  inputs: {
    label: string
    helper: string
    background: string
    backgroundHover: string
    backgroundFocused: string
    border: string
  }
  gadgets: {
    title: string
    subtitle: string
    branding: string
    header: string
    border: string
    background: string
    scrollbar: string
  }
  iconBars: {
    icon: string
    iconHover: string
    iconFocused: string
    iconBackground: string
    iconBackgroundHover: string
    background: string
  }
  pointers: {
    width: number
    label: string
    helper: string
    background: string
    backgroundHover: string
    shadow: string
    border: string
    lining: string
  }
  modals: {
    width: number
    height: number
    background: string
    shadow: string
    border: string
    cover: string
  }
}

export const Theme = createContext<ITheme>({
  global: {
    fonts: 15,
    radius: 3,
  },
  buttons: {
    label: '#FFFFFF',
    labelHover: '#FFFFFF',
    labelDisabled: '#444444',
    background: '#595959',
    backgroundMinor: '#494949',
    backgroundDisabled: '#222222',
    backgroundHover: '#777777',
    border: 'none',
  },
  inputs: {
    label: '#FFFFFF',
    helper: '#D5D5D5',
    background: '#323232',
    backgroundHover: '#292929',
    backgroundFocused: '#5C5C5C',
    border: 'none',
  },
  gadgets: {
    title: '#CCCCCC',
    subtitle: '#777777',
    branding: '#777777',
    header: '#3B3B3B',
    border: 'none',
    background: '#414141',
    scrollbar: '#505050',
  },
  iconBars: {
    icon: '#777777',
    iconHover: '#999999',
    iconFocused: '#C4C4C4',
    iconBackground: 'transparent',
    iconBackgroundHover: '#191919',
    background: '#2C2C2C',
  },
  pointers: {
    width: 240,
    label: '#FFFFFF',
    helper: '#CCCCCC',
    background: '#777777',
    backgroundHover: '#888888',
    shadow: '0 1px 25px -5px rgba(0, 0, 0, 0.35)',
    border: 'none',
    lining: 'none',
  },
  modals: {
    width: 500,
    height: 700,
    background: '',
    shadow: '',
    border: '',
    cover: '',
  },
})

export const useTheme = (overrides: Partial<ITheme> = {}): ITheme => {
  const theme = useContext(Theme)
  return Object.keys(theme).reduce((all, key) => {
    if (overrides[key]) all[key] = { ...theme[key], ...overrides[key] }
    return all
  }, theme)
}
