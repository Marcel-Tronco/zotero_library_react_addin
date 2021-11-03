import React from 'react'
import { body as typeDetailsSpecs } from '../models/TableSpecs'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const SpecificContent = (props) => {
  return <>
    {typeDetailsSpecs.details[props.detailsType].map((relevantField) => {
      return <>
        <Typography variant='h7' gutterBottom component='div'>{relevantField.label}</Typography>
        <Typography variant='body1' gutterBottom component='div'>{props.item[relevantField.fieldName]}</Typography>
      </>
    })}
  </>
}

const BookListDetails = (props) => {
  return <Box>
    <Typography variant='h6' gutterBottom component='div'>
            Detailansicht
    </Typography>
    <Typography variant='h7' gutterBottom component='div'>Beteilite Personen</Typography>
    <Typography variant='body1' gutterBottom component='div'>{props.item.creatorDetail}</Typography>
    <SpecificContent item={props.item} detailsType={
      typeDetailsSpecs.details[props.item.data.itemType]
        ? props.item.data.itemType
        : 'default'
    }/>
  </Box>
}

export default BookListDetails