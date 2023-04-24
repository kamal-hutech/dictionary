import "./App.css"
import { useState, useEffect } from "react"
import axios from "axios"
import { Container } from "@mui/material"
import Header from "./components/Header/Header"
import Definitions from "./components/Definitions/Definitions"
import { alpha, styled } from "@mui/material/styles"
import { grey } from "@mui/material/colors"
import Switch from "@mui/material/Switch"
function App() {
  const [word, setWord] = useState("plane")
  const [meanings, setMeanings] = useState()
  const [category, setCategory] = useState("en")
  const [lightMode, setLightMode] = useState(false)

  const ThemeChanger = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: grey[600],
      "&:hover": {
        backgroundColor: alpha(grey[600], theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: grey[600],
    },
  }))

  const label = { inputProps: { "aria-label": "Color switch demo" } }

  const dictionaryApi = async () => {
    try {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      )
      console.log(data)
      setMeanings(data.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    dictionaryApi()
  }, [word, category])
  return (
    <div
      className="App"
      style={{
        height: "100vh",
        backgroundColor: lightMode ? "#fff" : "#282c34",
        color: lightMode ? "black" : "white",
        transition: "all 0.5s linear",
      }}
    >
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ position: "absolute", top: 0, right: 15, padding: 10 }}>
          <span>{lightMode ? "Dark" : "Light"} Mode</span>
          <ThemeChanger
            checked={lightMode}
            onChange={() => setLightMode(!lightMode)}
          />
        </div>
        <Header
          category={category}
          setCategory={setCategory}
          word={word}
          setWord={setWord}
          lightMode={lightMode}
        />
        {meanings && (
          <Definitions
            word={word}
            meanings={meanings}
            category={category}
            lightMode={lightMode}
          />
        )}
      </Container>
    </div>
  )
}

export default App
