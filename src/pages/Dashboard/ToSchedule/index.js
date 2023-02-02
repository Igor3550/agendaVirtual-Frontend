import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

import { InputArea, SelectArea, DateSelect, HoursSelect } from "../../../components/Form";
import { getDayHours } from "../../../services/api";
import { useForm } from "../../../hooks/useForm";
import { Oval } from "react-loader-spinner";

const ToSchedulePage = () => {
  const [ dateHours, setDateHours ] = useState();
  const [form, handleForm] = useForm({date:dayjs()});

  const { isFetching, refetch } = useQuery('get-day-hours', 
    async () => await getDayHours(dayjs(form.date).format('YYYY-MM-DD')), 
    {
      onSuccess,
      onError
    });

  useEffect(() => {
    refetch();
    handleForm({target:{
      name:'hour',
      value:''
    }});
  }, [form.date]);

  function handleSubmit() {
    //console.log(sendScheduleBody);
    console.log(form);
  }

  function onSuccess(data) {
    setDateHours(data)
  }

  function onError() {
    setDateHours();
  } 
  
  return (
    <ToScheduleContainer>
      <InputArea placeholder='Cliente' name='name' onChange={handleForm} />
      <SelectArea name='service' onChange={handleForm} />
      <div>
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
            dateHours ? 
              <HoursSelect 
                title='Selecione o horário:' 
                dayHours={dateHours} 
                selectedHour={form.hour} 
                handleForm={handleForm} 
                name='hour'
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