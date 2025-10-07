import React, { createContext, useContext, useState, useCallback } from 'react';

const MenuContext = createContext();

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenuContext must be used within a MenuProvider');
  }
  return context;
};

export const MenuProvider = ({ children }) => {
  const [menuData, setMenuData] = useState({
    menuItems: null,
    staticData: null,
    progresscompletemin: null,
    setOpenDialog: null,
  });

  const updateMenuData = useCallback((data) => {
    setMenuData(prev => ({ ...prev, ...data }));
  }, []);

  return (
    <MenuContext.Provider value={{ menuData, updateMenuData }}>
      {children}
    </MenuContext.Provider>
  );
};
