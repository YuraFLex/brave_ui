import React from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from 'redux/theme/theme';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export const ThemeChanger = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme);

  const handleThemeClick = newWalue => {
    dispatch(changeTheme(newWalue));
  };
  console.log('theme:', theme);

  const DemoPaper = styled(Paper)(({ theme }) => ({
    maxWidth: 400,
    width: '100%',
    maxHeight: 400,
    height: '100%',
    border: '1px solid #e0e0e0',
    padding: theme.spacing(2),
    boxShadow: '4px 2px 9px 2px rgba(0, 0, 0, 0.4)',
  }));

  return (
    <DemoPaper
      square={false}
      style={{
        backgroundColor: theme === 'dark' ? '#824fb5c9' : '#fff',
        color: theme === 'dark' ? '#e1b0f3' : '#000',
        transition: 'background-color 0.5s linear, color 0.5s linear',
      }}
    >
      <FormControl>
        <FormLabel
          style={{
            color: theme === 'dark' ? '#e1b0f3' : '#000',
          }}
          id="demo-radio-buttons-group-label"
        >
          Select theme
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={theme}
          name="radio-buttons-group"
        >
          <FormControlLabel
            onClick={() => handleThemeClick('default')}
            value="default"
            control={<Radio />}
            label="Default"
          />
          <FormControlLabel
            onClick={() => handleThemeClick('dark')}
            value="dark"
            control={<Radio />}
            label="Dark"
          />
          <FormControlLabel
            onClick={() => handleThemeClick('other')}
            value="disabled"
            control={<Radio />}
            label="Other"
            disabled
          />
        </RadioGroup>
      </FormControl>
    </DemoPaper>
  );
};
