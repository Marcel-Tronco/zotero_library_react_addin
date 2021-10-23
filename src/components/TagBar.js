import React, {useState, useEffect} from "react";
import Toolbar from '@mui/material/Toolbar';
import Typography from "@mui/material/Typography";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";


const TagBar = ({tags, selected, setSelected, setPage}) => {
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

  return <Toolbar>
    <ToggleButtonGroup
      value={selected ? selected.name : "all"}
      onChange={handleTagChange}
      aria-label={"Kategorienauswahl"}
      exclusive
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
  </Toolbar>
}

export default TagBar

/*      <Toolbar> 
        
      </Toolbar>
*/