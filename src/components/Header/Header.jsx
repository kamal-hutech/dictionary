import React from "react"

import categories from "../../data/categories"

import "./Header.css"
import {
  TextField,
  ThemeProvider,
  MenuItem,
  Select,
  createTheme,
} from "@mui/material"

const Header = ({ category, setCategory, word, setWord, lightMode }) => {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: lightMode ? "#000" : "#fff",
      },
      mode: lightMode ? "light" : "dark",
    },
  })
  const handleChange = (language) => {
    setCategory(language)
    setWord("")
  }
  return (
    <div className="header">
      <span className="title">{word ? word : "Word Hunt"} </span>
      <div className="inputs">
        <ThemeProvider theme={darkTheme}>
          <TextField
            className="search"
            id="standard-basic"
            label="Search a Word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Select a Language"
            className="select"
            onChange={(e) => handleChange(e.target.value)}
          >
            {categories.map((category) => {
              return (
                <MenuItem key={category.label} value={category.label}>
                  {category.value}
                </MenuItem>
              )
            })}
          </Select>
        </ThemeProvider>
      </div>
    </div>
  )
}

export default Header
