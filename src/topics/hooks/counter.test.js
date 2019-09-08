import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import Counter from './Counter'


test('increase counter when button is clicked', () => {
    const { queryByText, getByText } = render(<Counter />)

    expect(queryByText(/clicked/i)).not.toBeNull()

    fireEvent.click(getByText(/click!/i))

    expect(queryByText(/1/i)).not.toBeNull()
})