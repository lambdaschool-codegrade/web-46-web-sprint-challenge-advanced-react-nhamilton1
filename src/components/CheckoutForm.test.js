import React from "react";
import MutationObserver from 'mutationobserver-shim';
import { render, screen, waitFor } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import userEvent from "@testing-library/user-event";

// Write up the two tests here and make sure they are testing what the title shows

test("renders without errors", () => {
    render(<CheckoutForm/>)
});

test("shows success message on submit with form details", async () => {
    render(<CheckoutForm/>)

    const firstName = screen.getByLabelText(/first name/i, {selector: 'input'})
    const lastName = screen.getByLabelText(/last name/i, {selector: 'input'})
    const address = screen.getByLabelText(/address/i, {selector: 'input'})
    const city = screen.getByLabelText(/city/i, {selector: 'input'})
    const state = screen.getByLabelText(/state/i, {selector: 'input'})
    const zip = screen.getByLabelText(/zip/i, {selector: 'input'})

    userEvent.type(firstName, 'Winston')
    userEvent.type(lastName, 'Hamilton')
    userEvent.type(address, '42 Wallaby Way')
    userEvent.type(city, 'Sydney')
    userEvent.type(state, 'Australia')
    userEvent.type(zip, '11901')

    const button = await screen.findByRole('button')
        userEvent.click(button)

    await waitFor(() => {
        const successMessage = screen.queryByTestId(/successMessage/i)
        const firstNameDisplay = screen.queryByText(/winston/i)
        const lastNameDisplay = screen.queryByText(/hamilton/i)
        const addressDisplay = screen.queryByText(/42 wallaby way/i)
        const cityDisplay = screen.queryByText(/sydney/i)
        const stateDisplay = screen.queryByText(/australia/i)
        const zipDisplay = screen.queryByText(/11901/i)

        expect(firstNameDisplay).toBeInTheDocument()
        expect(lastNameDisplay).toBeInTheDocument()
        expect(addressDisplay).toBeInTheDocument()
        expect(cityDisplay).toBeInTheDocument()
        expect(stateDisplay).toBeInTheDocument()
        expect(zipDisplay).toBeInTheDocument()
        expect(successMessage).toBeInTheDocument()
    })
});
