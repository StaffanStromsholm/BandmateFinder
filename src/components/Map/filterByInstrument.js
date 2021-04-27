import React from 'react';
import { makeStyles, StylesProvider } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import {instruments} from '../../config.js';
import styles from './FilterByInstrument.module.scss';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  multiLineColor: {
    
  } 
}));

export default function FilterByInstrument({setFilterByInstrument}) {
  const classes = useStyles();
  const [instrument, setInstrument] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setFilterByInstrument(event.target.value);
    setValue(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={styles.FilterByInstrument}>

      <h3>Search By Instrument</h3>
          
      <FormControl variant="outlined" className={classes.formControl}>
        {/* <InputLabel id="demo-controlled-open-select-label">Instrument</InputLabel> */}
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={value}
          onChange={handleChange}
          style={{backgroundColor: "#fff", width: "290px", padding: "0", margin: "0"}}
        >
          <MenuItem value="All">
            <em>All</em>
          </MenuItem>
          {Object.keys(instruments).map((key, index) => (
            <MenuItem key={index} value={key}>
              {key}
            </MenuItem>
          ))}

        </Select>
      </FormControl>
    </div>
  );
}