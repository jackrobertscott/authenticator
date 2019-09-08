import { createContext } from 'react'

export interface ITheme {
  global: {
    radius: string
    fonts: string
  }
  gadgets: {
    background: string
    scrollbar: string
  }
  iconbar: {
    background: string
    color: string
    colorHover: string
  }
  sidebar: {
    background: string
    border: string
    title: string
    color: string
    colorHover: string
  }
  inputs: {
    background: string
    backgroundHover: string
    border: string
    error: string
    color: string
    colorPrimary: string
    colorSecondary: string
  }
  buttons: {
    background: string
    backgroundHover: string
    border: string
    color: string
  }
  pointers: {
    background: string
    border: string
    color: string
  }
  headers: {
    background: string
    color: string
    brand: string
  }
  modals: {
    background: string
    border: string
    shadow: string
    height: string
    width: string
  }
  lists: {
    background: string
    backgroundHover: string
    border: string
    color: string
    label: string
  }
  search: {
    background: string
    color: string
    colorHover: string
  }
}

export const Theme = createContext<ITheme>({
  global: {
    fonts: '15px',
    radius: '3px',
  },
  gadgets: {
    background: '#414141',
    scrollbar: '#505050',
  },
  iconbar: {
    background: '#2C2C2C',
    color: '#777777',
    colorHover: '#999999',
  },
  sidebar: {
    background: '#353535',
    border: '1px solid #303030',
    title: '#ADADAD',
    color: '#777777',
    colorHover: '#999999',
  },
  inputs: {
    background: '#323232',
    backgroundHover: '#292929',
    border: 'none',
    error: '#A62F27',
    color: '#FFFFFF',
    colorPrimary: '#B9B9B9',
    colorSecondary: '#656565',
  },
  buttons: {
    background: '#595959',
    backgroundHover: '#616161',
    border: 'none',
    color: '#FFFFFF',
  },
  pointers: {
    background: '#505050',
    border: 'none',
    color: '#FFFFFF',
  },
  headers: {
    background: '#3B3B3B',
    color: '#ADADAD',
    brand: '#777777',
  },
  modals: {
    background: '#222222',
    border: '1px solid #222222',
    shadow: '0 0 0 10000px hsla(0, 0%, 0%, 0.5)',
    height: '760px',
    width: '545px',
  },
  lists: {
    background: '#4F4F4F',
    backgroundHover: '#585858',
    border: '1px solid #494949',
    color: '#FFFFFF',
    label: '#999999',
  },
  search: {
    background: '#434343',
    color: '#6F6F6F',
    colorHover: '#CCCCCC',
  },
})
