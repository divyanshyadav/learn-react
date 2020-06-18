import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import { URLParameters } from './URLParameters'


test('render correctly and I can navigate to provided links', () => {
    const history = createMemoryHistory({initialEntries: ['/']})

    const { getByRole, getByText } = render(
      <Router history={history}>
        <URLParameters />
      </Router>,
    )

    fireEvent.click(getByText(/netflix/i))
    expect(getByRole('heading')).toHaveTextContent(/welcome to netflix/i)
})
