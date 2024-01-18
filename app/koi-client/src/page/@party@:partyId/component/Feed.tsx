import { Button } from 'antd';
import React from 'react';
import { PartySchemaWithId } from 'shared~type-party';

interface Props {
  party: PartySchemaWithId;
}

const Feed = ({ party }: Props) => {
  return (
    <center>
      <p>호스트의 지시를 따라</p>
      <p>피드에 이동하여 댓글을 작성해주세요</p>
      <Button
        type="primary"
        size="large"
        onClick={() => {
          if (party.activityName) {
            window.open(party.activityName, '_blank');
          }
        }}
      >
        피드이동
      </Button>
    </center>
  );
};

export default Feed;
