import { AnyRecord } from 'dns';
import React, { useContext, useState } from 'react';
interface UserContext {
    info: any
    setInfo: (e) => void
  }
  
  // Create the context with an initial value and the TypeScript interface
export const UserContext = React.createContext<UserContext>({
  info: null,
  setInfo: (e) => {},
});
  