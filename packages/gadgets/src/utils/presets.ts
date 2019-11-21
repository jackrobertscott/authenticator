export const presetColors = (preset: string) => {
  switch (preset) {
    case 'facebook':
      return {
        color: 'hsl(220, 46%, 100%)',
        background: 'hsl(220, 46%, 48%)',
        border: `1px solid hsl(218, 51%, 30%)`,
        '&:hover': {
          color: 'hsl(220, 46%, 100%) !important',
          background: 'hsl(220, 46%, 51%) !important',
        },
        '&:active': {
          background: 'hsl(220, 46%, 48%) !important',
        },
      }
    case 'google':
      return {
        color: 'hsl(217, 89%, 100%)',
        background: 'hsl(217, 89%, 61%)',
        border: `1px solid hsl(217, 89%, 30%)`,
        '&:hover': {
          color: 'hsl(217, 89%, 100%) !important',
          background: 'hsl(217, 89%, 64%) !important',
        },
        '&:active': {
          background: 'hsl(217, 89%, 61%) !important',
        },
      }
    case 'github':
      return {
        color: 'hsl(210, 12%, 100%)',
        background: 'hsl(210, 12%, 16%)',
        border: `1px solid hsl(210, 12%, 10%)`,
        '&:hover': {
          color: 'hsl(210, 12%, 100%) !important',
          background: 'hsl(210, 12%, 19%) !important',
        },
        '&:active': {
          background: 'hsl(210, 12%, 16%) !important',
        },
      }
    case 'slack':
      return {
        color: 'hsl(299, 56%, 100%)',
        background: 'hsl(299, 56%, 19%)',
        border: `1px solid hsl(299, 56%, 10%)`,
        '&:hover': {
          color: 'hsl(299, 56%, 100%) !important',
          background: 'hsl(299, 56%, 22%) !important',
        },
        '&:active': {
          background: 'hsl(299, 56%, 19%) !important',
        },
      }
  }
  return {}
}