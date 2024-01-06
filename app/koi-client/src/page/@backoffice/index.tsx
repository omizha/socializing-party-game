import React from 'react';
import { Link } from 'react-router-dom';

const Backoffice = () => {
  return (
    <>
      <Link to="/backoffice/poll">투표 관리</Link>
      <Link to="/backoffice/party">파티 관리</Link>
    </>
  );
};

export default Backoffice;
