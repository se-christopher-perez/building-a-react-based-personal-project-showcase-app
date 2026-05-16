import React, { createContext, useContext } from "react";

export const CoffeeContext = createContext()

export function useCoffeeContext() {

    return useContext(CoffeeContext)

}