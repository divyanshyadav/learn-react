import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import LoginForm from './LoginForm'

test('invalid user credentials', async () => {
    const fakeResponse = { message: 'invalid credentials' }
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
        return Promise.resolve({
            json: () => Promise.reject(fakeResponse)
        })
    })

    const { getByLabelText, getByText, findByRole } = render(<LoginForm />)

    const usernameInput = getByLabelText(/username/i)
    const passwordInput = getByLabelText(/password/i)

    fireEvent.change(usernameInput, {target: { value: 'div' }})
    fireEvent.change(passwordInput, {target: { value: 'pass' }})

    fireEvent.click(getByText(/login/i))

    const alert = await findByRole('alert')
    expect(alert).toHaveTextContent(/invalid/i)
})

test('allow user to logged in successfully', async () => {

    const fakeResponse = { token: '123' }
    const fetchMock = jest.fn(() => {
        return Promise.resolve({
            json: () => Promise.resolve(fakeResponse)
        })
    })
    jest.spyOn(window, 'fetch').mockImplementationOnce(fetchMock)

    const { getByLabelText, getByText, findByRole, queryByText } = render(<LoginForm />)

    const username = 'div'
    const password = 'password'

    const usernameInput = getByLabelText(/username/i)
    const passwordInput = getByLabelText(/password/i)

    fireEvent.change(usernameInput, { target: { value: username } })
    fireEvent.change(passwordInput, { target: { value: password } })

    expect(usernameInput).toHaveValue(username)
    expect(passwordInput).toHaveValue(password)

    fireEvent.click(getByText(/login/i))
    expect(queryByText(/loading/i)).toBeInTheDocument()

    const alert = await findByRole('alert')

    expect(queryByText(/loading/i)).not.toBeInTheDocument()
    expect(alert).toHaveTextContent(/success/i)
    expect(fetchMock).toBeCalledTimes(1)
    expect(window.localStorage.getItem('token')).toEqual(fakeResponse.token)

})

test('should not call login api with no username or password', async () => {
    const mockFn = jest.fn()
    jest.spyOn(window, 'fetch').mockImplementationOnce(mockFn)

    const { getByText } = render(<LoginForm />)

    fireEvent.click(getByText(/login/i))

    expect(mockFn).toBeCalledTimes(0)

})