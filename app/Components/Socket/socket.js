import io from 'socket.io-client/dist/socket.io'

import {link} from '../../links/links'

export const socket =(id)=>{ 
  return io(link, {
  query:"id="+id,
  transports: ['websocket']
});
}