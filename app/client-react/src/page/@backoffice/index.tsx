import React, { useState, useEffect } from 'react';
import { ConnectionState } from './component/ConnectionState';
import { Events } from './component/Events';
import { ConnectionManager } from './component/ConnectionManager';
import { MyForm } from './component/MyForm';
import { socket } from '../../library/socket-io';

export default function Backoffice() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState<string[]>([]);

  useEffect(() => {
    function onFooEvent(value: string) {
      setFooEvents((previous) => [...previous, value]);
    }

    socket.on('foo', onFooEvent);

    return () => {
      socket.off('foo', onFooEvent);
    };
  }, []);

  return (
    <div className="App">
      <ConnectionState isConnected={isConnected} />
      <Events events={fooEvents} />
      <ConnectionManager />
      <MyForm />
    </div>
  );
}
