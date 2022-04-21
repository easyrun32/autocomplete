import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';
import './App.css';
import React from 'react';
import InputMask from 'react-input-mask';
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { label: 'Canada', value: 'CA' },
  { label: 'United States', value: 'US' },
];
export const countries = [
  { code: 'AD', label: 'Andorra', phone: '376' },
  { code: 'AE', label: 'United Arab Emirates', phone: '971' },
];
function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode;
}
function App() {
  const { register, watch, handleSubmit, control, getValues } = useForm();
  const defaultProps = {
    options: top100Films,
    getOptionLabel: (option) => option.label,
  };
  const getOpObj = (option) => {
    if (!option._id) option = countries.find((op) => op._id === option);
    return option;
  };
  console.log('watch', watch());

  return (
    <div className="App">
      <div className="select">
        <input autoComplete="name" style={{ marginBottom: '200px' }} />
        <Controller
          name="country"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <Autocomplete
                type={'country'}
                label="Country"
                id="country"
                {...defaultProps}
                autoSelect
                autoHighlight
                onInputChange={(event, newInputValue) => {
                  if (newInputValue.length > 0) {
                    const autoSelect = top100Films.find(
                      (e, i) => e.value === newInputValue
                    );
                    if (autoSelect) {
                      onChange(autoSelect);
                    }
                  }
                }}
                renderInput={(params) => {
                  const inputProps = params.inputProps;
                  inputProps.autoComplete = 'country';

                  return (
                    <TextField
                      {...params}
                      label={value ? value.value : 'country'}
                      placeholder="country"
                    />
                  );
                }}
                onChange={(_, data) => {
                  onChange(data);
                }}
              />
            );
          }}
        />

        <div style={{ marginTop: '200px' }}>
          {JSON.stringify(getValues('country'))}
        </div>
      </div>
    </div>
  );
}
/*
  <Autocomplete
                type={'country'}
                label="Country"
                id="country"
                {...defaultProps}
                autoSelect
                onInputChange={(event, newInputValue) => {}}
                renderInput={(params) => {
                  const inputProps = params.inputProps;
                  inputProps.autoComplete = 'country';
                  return (
                    <TextField
                      {...params}
                      label="country"
                      variant="standard"
                      placeholder="country"
                    />
                  );
                }}
              />
*/
export default App;
