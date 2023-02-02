import styled from "styled-components";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import { Oval, Rings } from "react-loader-spinner";

import { getDayHours } from "../../services/api";
import { SelectArea, DateSelect, HoursSelect } from "../Form";
import { useForm } from "../../hooks/useForm";

export const EditScheduleModal = ({ setVisible, schedule }) => {

  const [ form, handleForm ] = useForm({ 
    name: 'Leopoldo',
    date: dayjs() 
  });
  const [ dayHours, setDayHours ] = useState();

  const { isFetching, refetch } = useQuery('get-day-hours-edit', 
    async () => await getDayHours(dayjs(form.date).format('YYYY-MM-DD')), 
    {
      onSuccess: (data) => setDayHours(data),
      onError: () => setDayHours()
    });

  useEffect(() => {
    refetch();
    handleForm({target:{
      name:'hour',
      value:''
    }});
  }, [form.date]);

  function handleUpdate() {
    console.log(form);
  }

  return (
    <Container>
      <Background onClick={() => setVisible(false)} />
      <ModalArea>
        <p>Alterar agendamento de Andressa</p>
        <SelectArea name='service' onChange={handleForm} />
        <DateHourArea>
          <DateSelect 
            label='Escolha o dia'
            value={form.date}
            handleForm={handleForm}
            name='date'
          />
          {isFetching ?
              <Oval
                height={20}
                width={20}
                color="#fff"
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#FFA3CF"
              />
            :
              dayHours ?
                <HoursSelect 
                  title='Selecione o horário:' 
                  dayHours={dayHours} 
                  selectedHour={form.hour} 
                  handleForm={handleForm} 
                  name='hour'
                />
              : <></>
          }
        <SubmitButton onClick={handleUpdate}><strong>Alterar</strong></SubmitButton>
        </DateHourArea>
      </ModalArea>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalArea = styled.div`
  z-index: 1;
  background-color: #FF5CA1;
  width: 550px;
  height: 600px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  p{
    color: #fff;
  }
`;

const DateHourArea = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  opacity: 0.5;
  position: fixed;
  right: 0;
  top: 0;
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