import { Socket } from 'socket.io-client';
import { AnyRecord } from 'dns';
import React, { useContext, useState } from 'react';
interface SocketContext {
    socket: any
  }
  // Create the context with an initial value and the TypeScript interface
export const SocketContext = React.createContext<SocketContext>({
    socket: null
  });
  