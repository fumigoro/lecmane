import { useEffect, useState } from 'react';
import { roomApi } from '../rooms.api';

const useRoomApi = () => {
  const [roomsApiInitialized, setRoomsApiInitialized] = useState(false);
  useEffect(() => {
    roomApi.initialize().then(() => setRoomsApiInitialized(true));
  });

  if (roomsApiInitialized) {
    return { roomApi };
  }
  return { roomApi: undefined };
};

export default useRoomApi;
