import { fireEvent, screen} from '@testing-library/react'
import { render } from '../../utils/test-utils'
import Header from './Header'



test('render Header Component', async () => {
  render(<Header />)
  const HeaderTitle = await screen.findByText("Spells")
  const ViewFavoritesBtn = await screen.findByText(/View favorites/i)
  const favoriteModal =  screen.getByTestId('header-modal')
  
  expect(favoriteModal.classList.contains('hidden')).toBe(true)
  
  fireEvent.click(ViewFavoritesBtn)

  expect(favoriteModal.classList.contains('visible')).toBe(true)
  expect(HeaderTitle).toBeInTheDocument()
  expect(ViewFavoritesBtn).toBeInTheDocument()
})