import React, {useState} from "react"
import Toolbar from '@mui/material/Toolbar'
import Typography from "@mui/material/Typography"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import ToggleButton from "@mui/material/ToggleButton"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import SearchIcon from '@mui/icons-material/Search'
import IconButton from "@mui/material/IconButton"


const TagBar = ({tags, selected, setSelected, setPage, setCurrentSearch, setRowsPerPage, buttonsDisabled}) => {
  const [searchFieldText, setSearchFieldText] = useState("")
  const changeSearchFieldText = (event) => {
    setSearchFieldText(event.target.value)
  }
  const handleTagChange = (event, selection) => {
    setPage(0)
    if (selection === "all") {
      setSelected()
    }
    for (let tagObj of tags){
      if (tagObj.name === selection) {
        setSelected(tagObj)
        return
      }
    }
  }
  const handleSearchIconClick = () => {
    setCurrentSearch(searchFieldText)
    setSearchFieldText("")
    setPage(0)
    setRowsPerPage(25)
  }

  return <Toolbar>
    <ToggleButtonGroup
      value={selected ? selected.name : "all"}
      onChange={handleTagChange}
      aria-label={"Kategorienauswahl"}
      exclusive
      disabled={buttonsDisabled}
      sx={{
        flexGrow:1
      }}
    >
      {[{name: "all", key:"all"}].concat(tags).map((tag)=>{
        return <ToggleButton
          value={tag.name}
          aria-label={tag.name}
          key={tag.name}
        > 
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
            >
              {tag.name}
          </Typography>
        </ToggleButton>
      })}
    </ToggleButtonGroup>
    <Box
      edge="end"
    >
      <TextField
        type="search"
        label="Suche..."
        variant="outlined"
        onChange={changeSearchFieldText}
        value={searchFieldText}
      />
      <IconButton
        disabled={buttonsDisabled}
        onClick={handleSearchIconClick}
      >
        <SearchIcon/>
      </IconButton>
    </Box>
  </Toolbar>
}

export default TagBar