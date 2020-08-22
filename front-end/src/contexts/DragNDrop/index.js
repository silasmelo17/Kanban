import React, { 
  createContext, 
  useContext, 
  useState, 
  useEffect 
} from 'react'

import getLocalStorage from '../../util/getLocalStorage.js'

const DragNDropContext = createContext()

export function DragNDropProvider ({ children }) {
  const myLocalStorage = getLocalStorage('post-its')
  const [ drag, setDrag ] = useState({})
  const [ data, setData ] = useState([])


  
  useEffect( () => {
    if( myLocalStorage.getString() === null ) 
      myLocalStorage.setItem(data)
    else
      setData(myLocalStorage.getItem('post-its'))
  }, [] )


  const updateData = dropzone => {
    setData([ 
      ...data.filter( postIt => postIt !== drag ), 
      { ...drag, state: dropzone }
    ])

    myLocalStorage.setItem(data)
  }



  return (
    <DragNDropContext.Provider value={{
      data,
      setDrag,
      updateData,
    }}>
      {children}
    </DragNDropContext.Provider>
  )

}

export const useDragNDrop = () => useContext(DragNDropContext) 
