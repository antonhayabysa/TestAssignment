import React, {createContext, useContext, useState, ReactNode} from 'react';

interface UserContextProps {
  isUserRegistered: boolean;
  setIsUserRegistered: (isRegistered: boolean) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  return (
    <UserContext.Provider value={{isUserRegistered, setIsUserRegistered}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
