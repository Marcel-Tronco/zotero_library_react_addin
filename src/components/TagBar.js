import React, {useState, useEffect} from "react";
import Toolbar from '@mui/material/Toolbar';
import Typography from "@mui/material/Typography";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";


const TagBar = ({tags, selected, setSelected}) => {
  const handleTagChange = (event, selection) => {
    setSelected(selection)
    console.log(selected)
  }

  return <Toolbar>
    <ToggleButtonGroup
      value={selected}
      onChange={handleTagChange}
      aria-label={"Kategorienauswahl"}
    >
      {tags.map((tag)=>{
        return <ToggleButton
          value={tag}
          aria-label={tag}
        > 
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
            >
              {tag}
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