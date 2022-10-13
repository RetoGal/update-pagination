import logo from "./logo.svg"
import "./App.css"
import React, { useEffect, useState } from "react"
import axios from "axios"

function App() {
  const [photos, setPhotos] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (fetching) {
      console.log("fetching")
      axios
        .get("https://jsonplaceholder.typicode.com/photos?_limit=10&_page=3")
        .then((response) => {
          setPhotos([...photos, ...response.data])
          setCurrentPage((prevState) => prevState + 1)
        })
        .finally(() => setFetching(false))
    }
  }, [fetching])

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler)

    return function () {
      document.removeEventListener("scroll,", scrollHandler)
    }
  }, [])

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      30
    ) {
      setFetching(true)
    }
  }
  return (
    <div className="App">
      {photos.map((photo) => {
        return (
          <>
            <div className="photo">
              <div className="titie">
                {photo.id}.{photo.title}
              </div>
              <img src={photo.thumbnailUrl} alt="" />
            </div>
          </>
        )
      })}
    </div>
  )
}

export default App
