import React, { 
  createContext, 
  useContext, 
  useState, 
} from 'react'

const DragNDropContext = createContext()

export function DragNDropProvider ({ children }) {
  const [ drag, setDrag ] = useState({})

  return (
    <DragNDropContext.Provider value={{ drag, setDrag }}>
      {children}
    </DragNDropContext.Provider>
  )

}

export const useDragNDrop = () => useContext(DragNDropContext) 
