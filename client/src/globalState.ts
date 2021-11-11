import { createGlobalState } from 'react-hooks-global-state'
import { light } from './settings/themes';

const initialState = {
  theme: light,
  language: 'RU',
  showSidebar: false 
}

export const { useGlobalState } = createGlobalState(initialState)
