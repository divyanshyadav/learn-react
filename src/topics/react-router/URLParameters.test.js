import React from 'react'
import { render } from '@testing-library/react'
import URLParameters from './URLParameters'


it('should render correctly', () => {
    const { queryByText, getByText } = render(<URLParameters />)

    expect(queryByText(/netflix/i)).not.toBeNull()
    expect(queryByText(/amazon prime/i)).not.toBeNull()

    
})