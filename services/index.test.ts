import { cleanup } from "@testing-library/react"

import productJson from "./mock/data.json"
import { getProducts } from "./index"

let response:any

beforeEach(() => {
  response = productJson
})

afterEach(() => {
  response = null
  cleanup()
})

describe("Products service", () => {

  it("should array", async () => {
    const { data: { products } } = await getProducts()

    expect(Array.isArray(products)).toBeTruthy()
    expect(products.length).toBeGreaterThan(0)
  })

  it("contain", async () => {
    const { data: { products } } = await getProducts()
  
    expect(products).toEqual(response)
  })
})

