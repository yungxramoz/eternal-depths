import { render } from '@testing-library/react'
import React from 'react'
import IconButton from './IconButton'

describe('IconButton', () => {
  it('renders the small icon button correctly', () => {
    render(<IconButton icon="plus" size="small" />)
    expect(document.body).toMatchSnapshot('IconButton Small')
  })
  it('renders the medium icon button correctly', () => {
    render(<IconButton icon="plus" size="medium" />)
    expect(document.body).toMatchSnapshot('IconButton Medium')
  })
  it('renders the large icon button correctly', () => {
    render(<IconButton icon="plus" size="large" />)
    expect(document.body).toMatchSnapshot('IconButton Large')
  })
  it('disables the button when the disabled prop is true', () => {
    render(<IconButton icon="plus" disabled />)
    expect(document.body).toMatchSnapshot('IconButton Disabled')
  })

  it('renders chveron left icon', () => {
    render(<IconButton icon="chevron-left" />)
    expect(document.body).toMatchSnapshot('IconButton Chevron Left')
  })

  it('renders chveron right icon', () => {
    render(<IconButton icon="chevron-right" />)
    expect(document.body).toMatchSnapshot('IconButton Chevron Right')
  })

  it('renders arrow left icon', () => {
    render(<IconButton icon="arrow-left" />)
    expect(document.body).toMatchSnapshot('IconButton Arrow Left')
  })

  it('renders minus icon', () => {
    render(<IconButton icon="minus" />)
    expect(document.body).toMatchSnapshot('IconButton Minus')
  })

  it('renders plus icon', () => {
    render(<IconButton icon="plus" />)
    expect(document.body).toMatchSnapshot('IconButton Plus')
  })

  it('renders close icon', () => {
    render(<IconButton icon="close" />)
    expect(document.body).toMatchSnapshot('IconButton Close')
  })
})
