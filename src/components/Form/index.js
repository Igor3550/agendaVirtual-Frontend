import * as React from 'react';
import styled from "styled-components";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { hoursList } from '../utils/getHoursList';

export const InputArea = ({ ...otherProps }) => {
  return (
    <Input {...otherProps} />
  )
}

export const SelectArea = ({ options, ...otherProps }) => {
  return (
    <Select {...otherProps}>
      {options.map(option => {
        return <option value={option.value} label={option.label} />
      })}
    </Select>
  )
}

export const DateSelect = ({label, value, setValue }) => {

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Calendar>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <DesktopDatePicker
            label={label}
            inputFormat="DD/MM/YYYY"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    </Calendar>
  );
}

export const HoursSelect = ({ dayHours, title, selectedHour, setSelectedHour }) => {
  
  return (
    <HoursArea>
      <p>{title}</p>
      <div>
        {hoursList.map((hour, index) => {
          if(selectedHour === hour){
            return <SelectedHour key={index}>{hour}h</SelectedHour>
          }
          return <Hour key={index} state={dayHours[hour] ? true : false} onClick={dayHours[hour] ? ()=>{setSelectedHour(hour)} : () => {}} >{hour}h</Hour>;
        })}
      </div>
    </HoursArea>
  );
}

const Input = styled.input`
  width: 80%;
  height: 60px;
  background-color: #FFA3CF;
  font-size: 18px;
  color: #fff;
  border-radius: 10px;
  border: 0;
  outline: none;
  margin: 10px 0;
  padding: 10px;

  ::placeholder{
    color: #fff;
    opacity: 0.7;
  }
`;

const Select = styled.select`
  width: 80%;
  height: 60px;
  background-color: #FFA3CF;
  font-size: 18px;
  color: #fff;
  border-radius: 10px;
  border: 0;
  margin: 10px 0;
  outline: none;
  padding: 10px;
`;

const Calendar = styled.div`
  width: 100%;
  background-color: #FFA3CF;
  border-radius: 10px;
  padding: 7px;
  color: #fff;
`;

const HoursArea = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FFA3CF;
  padding: 5px;
  border-radius: 10px;
  margin: 15px 0;

  p{
    font-size: 15px;
    color: #fff;
  }

  div{
    display: flex;
    flex-direction: row;
    margin-top: 8px;
  }
`;

const Hour = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.state ? '#fff' : '#A3A3A3'};
  border-radius: 5px;
  color: ${(props) => props.state ? '#FF5CA1' : '#fff'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3px;

  :hover{
    ${(props) => props.state ? 'cursor: pointer;' : ''};
  }
`;

const SelectedHour = styled.div`
  width: 30px;
  height: 30px;
  background-color: #FF5CA1;
  border-radius: 5px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;

  :hover{
    ${(props) => props.state ? 'cursor: pointer;' : ''};
  }
`;