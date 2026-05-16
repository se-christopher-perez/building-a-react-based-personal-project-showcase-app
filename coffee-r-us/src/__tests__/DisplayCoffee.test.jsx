import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import CoffeeListings from "../components/CoffeeListings"
import { CoffeeContext } from "../context/CoffeeContext"

describe("Display coffee", () => {

    test("Display coffees on start", async () => {

        const coffees = [

            {
                "id": "1",
                "description": "Medium Roast, nutty flavor",
                "name": "Vanilla bean",
                "origin": "Columbia",
                "price": 10
            }

        ]

        render(
            <CoffeeContext.Provider value={{ coffees, setCoffees: vi.fn() }}>
                <CoffeeListings />
            </CoffeeContext.Provider>
        )

        expect(await screen.findByText("Vanilla bean")).toBeInTheDocument()
        expect(await screen.findByText("Medium Roast, nutty flavor")).toBeInTheDocument()
        expect(await screen.findByText("10")).toBeInTheDocument()
        expect(await screen.findByText("Columbia")).toBeInTheDocument()

    })

})