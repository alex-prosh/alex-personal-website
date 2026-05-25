import { render } from '@testing-library/react'
import ObfuscatedEmail from './ObfuscatedEmail'

describe('ObfuscatedEmail', () => {
  it('renders a mailto link', () => {
    const { getByRole } = render(
      <ObfuscatedEmail user="pro" domain="berkeley.edu" />
    )
    const link = getByRole('link')
    expect(link).toHaveAttribute('href', 'mailto:pro@berkeley.edu')
  })

  it('displays the assembled email address', () => {
    const { getByText } = render(
      <ObfuscatedEmail user="pro" domain="berkeley.edu" />
    )
    expect(getByText('pro@berkeley.edu')).toBeInTheDocument()
  })
})
