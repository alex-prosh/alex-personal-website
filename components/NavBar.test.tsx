import { render } from '@testing-library/react'
import NavBar from './NavBar'

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  )
})

describe('NavBar', () => {
  it('renders all nav links', () => {
    const { getByText } = render(<NavBar />)
    expect(getByText('About')).toBeInTheDocument()
    expect(getByText('Research')).toBeInTheDocument()
    expect(getByText('Publications')).toBeInTheDocument()
    expect(getByText('Blog')).toBeInTheDocument()
    expect(getByText('CV')).toBeInTheDocument()
  })

  it('renders the site name', () => {
    const { getByText } = render(<NavBar />)
    expect(getByText('Alex Pro')).toBeInTheDocument()
  })
})
