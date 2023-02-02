import { useQuery } from "react-query";
import styled from "styled-components";
import { ScheduleListComponent } from "../../../components/ScheduleList/ScheduleListComponent";

const SchedulesPage = () => {
  
  return (
    <SchedulesContainer>
      <ScheduleListComponent />
    </SchedulesContainer>
  );

}

export default SchedulesPage;

const SchedulesContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;