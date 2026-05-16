import { render, screen, cleanup } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import AdminPortal from "../pages/AdminPortal"
import { CoffeeContext } from "../context/CoffeeContext";
import userEvent from "@testing-library/user-event";
import CoffeeListings from "../components/CoffeeListings";

describe("Adds coffee", () => {

    test("POST is called", async () => {

        const coffee = {

            "id": "1",
            "description": "Medium Roast, nutty flavor",
            "name": "Vanilla bean",
            "origin": "Columbia",
            "price": 10

        }

        const newCoffee = {

            "id": "2",
            "description": "Dark Roast, Rich flavor",
            "name": "House Blend",
            "origin": "Vietnam",
            "price": 12

        }

        global.fetch = vi.fn().mockResolvedValueOnce({
            ok: true,
            json: vi.fn().mockResolvedValue(newCoffee)
        })

        render(
            <CoffeeContext.Provider value={{ coffees: [coffee], setCoffees: vi.fn() }}>
                <AdminPortal />
            </CoffeeContext.Provider>
        )

        await userEvent.type(screen.getByLabelText("Coffee Name"), "House Blend")
        await userEvent.type(screen.getByLabelText("Description"), "Dark Roast, Rich flavor")
        await userEvent.type(screen.getByLabelText("Origin"), "Vietnam")
        await userEvent.type(screen.getByLabelText("Price"), "12")

        await userEvent.click(screen.getByDisplayValue("Submit"))

        expect(global.fetch).toHaveBeenCalledWith(
            "http://localhost:8000/coffee",
            expect.objectContaining({ method: "POST" })
        )

    })

    test("New coffee appears", () => {

        const coffee = {

            "id": "1",
            "description": "Medium Roast, nutty flavor",
            "name": "Vanilla bean", "origin": "Columbia",
            "price": 10

        }
        const newCoffee = {

            "id": "2",
            "description": "Dark Roast, Rich flavor",
            "name": "House Blend",
            "origin": "Vietnam",
            "price": 12

        }

        render(
            <CoffeeContext.Provider value={{ coffees: [coffee, newCoffee], setCoffees: vi.fn() }}>
                <CoffeeListings />
            </CoffeeContext.Provider>
        )

        expect(screen.getByText("House Blend")).toBeInTheDocument()
        expect(screen.getByText("Vanilla bean")).toBeInTheDocument()

    })
})

afterEach(() => {
    cleanup();
});