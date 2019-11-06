import * as yup from 'yup'
import { createElement as create, FC } from 'react'
import {
  Gadgets,
  useSchema,
  Layout,
  Control,
  InputString,
  Button,
} from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { SettingsStore } from '../utils/settings'
import { createUseServer } from '../hooks/useServer'

export const LoginUser: FC = () => {
  const gqlLoginUser = useLoginUser()
  const settings = useSettings()
  const schema = useSchema({
    local: 'wga.LoginUser',
    schema: yup.object().shape({
      email: yup
        .string()
        .email('Please make sure you have used a valid email address')
        .required('Please provide your email'),
      password: yup.string().required('Please provide your password'),
    }),
    submit: value => {
      gqlLoginUser.fetch({ value }).then(({ session }) => {
        schema.change('password')('')
        SettingsStore.change(old => ({
          ...old,
          bearer: `Bearer ${session.token}`,
        }))
      })
    },
  })
  return create(Gadgets, {
    title: 'Login',
    subtitle: settings.state.appname,
    children: create(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: [
        create(Control, {
          key: 'email',
          label: 'Email',
          error: schema.error('email'),
          children: create(InputString, {
            value: schema.value('email'),
            change: schema.change('email'),
            placeholder: 'example@email.com',
          }),
        }),
        create(Control, {
          key: 'password',
          label: 'Password',
          error: schema.error('password'),
          children: create(InputString, {
            value: schema.value('password'),
            change: schema.change('password'),
            placeholder: '**********',
            password: true,
          }),
        }),
        create(Button, {
          key: 'submit',
          label: 'Login',
          disabled: !schema.valid,
          click: schema.submit,
        }),
      ],
    }),
  })
}

const useLoginUser = createUseServer<{
  session: {
    id: string
    token: string
  }
}>({
  name: 'LoginUser',
  query: `
    mutation LoginUser($value: LoginUserValue!) {
      session: LoginUser(value: $value) {
        id
        token
      }
    }
  `,
})

const useListProviders = createUseServer<{
  providers: Array<{
    id: string
  }>
}>({
  name: 'ListProviders',
  query: `
    query ListProviders {
      providers: ListProviders {
        id
      }
    }
  `,
})
