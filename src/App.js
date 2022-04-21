import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';
import './App.css';
import React, { useEffect, useRef, useState } from 'react';

import { countriesOptions } from './countries';

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
  const [openMenu, setOpenMenu] = useState(false);

  const [input, setInput] = useState('Select Country');

  const defaultProps = {
    options: countriesOptions,
    getOptionLabel: (option) => option.label,
  };

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
                open={openMenu}
                type={'country'}
                label="Country"
                id="country"
                {...defaultProps}
                onClose={() => {
                  setOpenMenu(false);
                }}
                autoSelect
                autoHighlight
                onInputChange={(event, newInputValue) => {
                  if (newInputValue.length > 0) {
                    const autoSelect = countriesOptions.find(
                      (e, i) => e.value === newInputValue
                    );
                    if (autoSelect) {
                      onChange(autoSelect);
                      setInput(autoSelect.label);
                    }
                  }
                }}
                renderInput={(params) => {
                  //Input css and attributes
                  const inputProps = params.inputProps;
                  inputProps.autoComplete = 'country';
                  inputProps.className = 'mui-input';
                  //label css and attributes
                  const inputLabel = params.InputLabelProps;
                  inputLabel.className = 'mui-label';
                  return (
                    <div
                      ref={params.InputProps.ref}
                      className="mui-container"
                      onClick={() => {
                        setOpenMenu(true);
                      }}
                    >
                      <input
                        {...params.inputProps}
                        autoFocus
                        value={input}
                        onInput={(e) => {
                          setInput(e.target.value);
                        }}
                      />
                      <div className="right"></div>
                    </div>
                  );
                }}
                // if something changes upon select
                onChange={(_, data) => {
                  setOpenMenu(false);
                  onChange(data);
                  if (data) {
                    setInput(data.label);
                  }
                }}
              />
            );
          }}
        />

        <div style={{ marginTop: '600px' }}>
          {JSON.stringify(getValues('country'))}
        </div>
        <button
          onClick={() => {
            console.log('BUTTON', getValues('country'));
          }}
        >
          what is it
        </button>
      </div>
    </div>
  );
}

export default App;
