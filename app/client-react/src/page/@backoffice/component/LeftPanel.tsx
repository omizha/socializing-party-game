import styled from '@emotion/styled';
import { QRCodeSVG } from 'qrcode.react';

const LeftPanel = () => {
  return (
    <Container>
      <QRCodeSVG width="340px" height="340px" value="http://127.0.0.1:5173" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 360px;
  height: 100%;
  background-color: #dddddd;
  padding: 10px;
`;

export default LeftPanel;
