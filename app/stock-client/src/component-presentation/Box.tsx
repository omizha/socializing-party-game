import React from 'react';
import styled from '@emotion/styled';

interface BoxProps {
  title?: string;
  value: string;
  rightComponent?: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({ title, value, rightComponent }) => {
  return (
    <Container>
      <div>
        {title && <ContainerTitle>{title}</ContainerTitle>}
        <ContainerBolder>{value}</ContainerBolder>
      </div>
      {rightComponent}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 12px;
  border-radius: 8px;
  overflow: hidden;

  margin-bottom: 12px;
`;

const ContainerTitle = styled.div`
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const ContainerBolder = styled.div`
  font-size: 18px;
  font-weight: bolder;
`;

export default Box;
