import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

import { InputArea, SelectArea, DateSelect, HoursSelect } from "../../../components/Form";
import { getDayHours } from "../../../services/api";

const ToSchedulePage = () => {
  const [ name, setName ] = useState();
  const [ date, setDate ] = useState(dayjs());
  const [ selectedHour, setSelectedHour ] = useState();
  const [ selectedService, setSelectedService ] = useState();
  const [ dateHours, setDateHours ] = useState();
  const { isFetching, refetch } = useQuery('get-day-hours', 
    async () => await getDayHours(dayjs(date).format('YYYY-MM-DD')), 
    {
      onSuccess,
      onError
    });

  useEffect(() => {
    refetch();
    setSelectedHour();
  }, [date]);

  const options = [
    {value:'service', label: 'Service'},
    {value:1, label: 'Service1'}
  ]

  function handleSubmit() {
    const sendScheduleBody = {
      name,
      date: dayjs(date).format('YYYY-MM-DD'),
      hour: selectedHour,
      service: selectedService
    }
    console.log(sendScheduleBody);
  }

  function onSuccess(data) {
    setDateHours(data)
  }

  function onError() {
    setDateHours();
  } 
  
  return (
    <ToScheduleContainer>
      <InputArea placeholder='Cliente' value={name} onChange={(e) => setName(e.target.value)} />
      <SelectArea options={options} onChange={(e) => setSelectedService(e.target.value)} />
      <div>
        <DateSelect 
          label='Escolha o dia'
          value={date}
          setValue={setDate}
        />
        {isFetching ? 
          <p>Loading...</p>
          :
            dateHours ? 
              <HoursSelect 
                title='Selecione o horário:' 
                dayHours={dateHours} 
                selectedHour={selectedHour} 
                setSelectedHour={setSelectedHour} 
              />
            :
              <></>
        }
        <SubmitButton onClick={handleSubmit} >Agendar</SubmitButton>
      </div>
    </ToScheduleContainer>
  );

}

export default ToSchedulePage;

const ToScheduleContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;

  >div{
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 60px;
  color: #fff;
  background-color: #FFA3CF;
  font-size: 20px;
  text-align: center;
  border: 0;
  border-radius: 10px;
  margin-top: 15px;
  :hover{
    cursor: pointer;
  }
`;