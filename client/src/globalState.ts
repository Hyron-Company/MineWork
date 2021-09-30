import { createGlobalState } from 'react-hooks-global-state'
import { light } from './settings/themes';

const initialState = {
  theme: light,
  language: 'RU',

  followPopup: true
}

export const { useGlobalState } = createGlobalState(initialState)
