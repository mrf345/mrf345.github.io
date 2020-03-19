import React from "react"
import { Provider } from "react-redux"
import { render } from "@testing-library/react"
import configureStore from "redux-mock-store"

import Intro from "./Intro"
import config from "../config.json"


describe("Testing Intro container", () => {
  const mockStore = configureStore([])
  const name = "Testing Name"
  const avatar_url = "http://somewhere.testing"
  const login = "Testing Login"
  let store: any

  beforeEach(() => {
    store = mockStore({info: {name, avatar_url, login},
                       loading: {info: false}})
  })

  test("Sanity check Intro content", () => {
    const component = render(
      <Provider store={store}>
        <Intro />
      </Provider>
    )
    const description = component.getByText(config.description.join(" "))

    expect(description).toBeTruthy()
    expect(description.tagName).toEqual("DIV")

    description.remove()
    expect(component).toMatchSnapshot()
  })
})
