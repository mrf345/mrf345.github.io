import React from "react"
import { render } from "@testing-library/react"
import configureStore from "redux-mock-store"

import { Likes } from "./Projects"
import { faLock } from "@fortawesome/free-solid-svg-icons"
import { Provider } from "react-redux"

describe("Testing Projects container", () => {
  const mockStore = configureStore([])
  const repo = {html_url: "http://testing.com",
                id: 103123,
                name: "testing name",
                description: "testing description",
                language: "testing language",
                stargazers_count: 999}
  let store: any

  beforeEach(() => {
    store = mockStore({
      repos: Array(5).fill(repo),
      starred: Array(5).fill(repo),
      loading: {repos: false, starred: false}
    })
  })

  test("Sanity check Projects content", () => {
    const component = render(
      <Provider store={store}>
        <Likes
          icon={faLock}
          animation="fadeInDown"
        />
      </Provider>)

    expect(component).toMatchSnapshot()
  })
})
