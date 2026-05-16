import { render, screen, cleanup } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import CoffeeListings from "../components/CoffeeListings";
import { CoffeeContext } from "../context/CoffeeContext";
import userEvent from "@testing-library/user-event";

describe("Search coffee", () => {

    test("Search filters coffees by name", async () => {

        const coffees = [
            {

                "id": "1",
                "description": "Medium Roast, nutty flavor",
                "name": "Vanilla bean",
                "origin": "Columbia",
                "price": 10

            },
            {

                "id": "2",
                "description": "Dark Roast, Rich flavor",
                "name": "House Blend",
                "origin": "Vietnam",
                "price": 12

            }
        ]

        render(
            <CoffeeContext.Provider value={{ coffees, setCoffees: vi.fn() }}>
                <CoffeeListings />
            </CoffeeContext.Provider>
        )

        expect(await screen.findByText(/Vanilla bean/i)).toBeInTheDocument()
        expect(await screen.findByText(/House Blend/i)).toBeInTheDocument()

        await userEvent.type(screen.getByPlaceholderText(/search/i), "House Blend")

        expect(screen.getByText(/House Blend/i)).toBeInTheDocument()
        expect(screen.queryByText(/Vanilla bean/i)).not.toBeInTheDocument()

    })

})

afterEach(() => {
    cleanup();
})