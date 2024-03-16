import { render } from '@testing-library/react'
import React from 'react'
import { RPGUI_ICON } from '../../../constants/rpgui-icon'
import RpgIcon from './RpgIcon'

describe('RpgIcon', () => {
  it('renders correctly', () => {
    render(<RpgIcon icon={RPGUI_ICON.SWORD} />)
    expect(document.body).toMatchSnapshot('RpgIcon')
  })
})
