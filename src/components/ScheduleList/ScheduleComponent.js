import styled from "styled-components";
import { IconContext } from "react-icons";
import { BsTrash } from "react-icons/bs";
import { HiOutlinePencil } from "react-icons/hi";
import { EditScheduleModal } from "./EditScheduleModal";
import { useState } from "react";

export const ScheduleComponent = () => {

  const [ editModal, setEditModal ] = useState(false);

  return (
    <ScheduleContainer>
      {editModal ? <EditScheduleModal setVisible={setEditModal} /> : <></>}
      <IconContext.Provider value={{ className: 'icons' }} >

        <TopContext>
          <ClientInfo>
            <p><strong>Cliente:</strong> Andressa Dias</p>
            <p><strong>Horário:</strong> 7h</p>
            <p><strong>Serviço:</strong> Fibra de vidro</p>
            <p><strong>Data:</strong> 01/12</p>
          </ClientInfo>
          <SideButtonsArea>
            <SideButton onClick={() => setEditModal(!editModal)} ><HiOutlinePencil /></SideButton>
            <SideButton><BsTrash /></SideButton>
          </SideButtonsArea>
        </TopContext>
        <EndButton>Finalizar</EndButton>

      </IconContext.Provider>
    </ScheduleContainer>
  )
}

const ScheduleContainer = styled.div`
  width: 80%;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
  display: flex;
  flex-direction: column;

  div{
    display: flex;
  }

  .icons {
		color: #ffffff;
		font-size: 20px;
  }
`;

const TopContext = styled.div`
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
  margin-bottom: 10px;
`;

const ClientInfo = styled.div`
  flex-direction: column;

  p{
    color: #FF5CA1;
    margin-bottom: 2px;
  }
`;

const SideButtonsArea = styled.div`
  flex-direction: column;
`;

const SideButton = styled.button`
  display: flex;
  width: 32px;
  height: 32px;
  border-radius: 5px;
  border: 0;
  margin: 2px;
  text-align: center;
  align-items: center;
  background-color: #FFA3CF;

  :hover{
    cursor: pointer;
  }
`;

const EndButton = styled.button`
  width: 60%;
  height: 40px;
  margin: auto;
  border-radius: 5px;
  border: 0;
  text-align: center;
  align-items: center;
  background-color: #FF5CA1;
  font-size: 20px;
  font-weight: 700;
  color: #fff;

  :hover{
    cursor: pointer;
  }
`;