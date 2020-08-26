import React, { 
  createContext, 
  useContext, 
  useState, 
  useEffect
} from 'react'

import getLocalStorage from '../../util/getLocalStorage.js'

const DataContext = createContext()

export function DataProvider ({ children }) {
  const myLocalStorage = getLocalStorage('post-its')

  const [ data, setData ] = useState( myLocalStorage.getItem() || [] )
  const [ visible, setVisible ] = useState(false)
  const [ edited, setEdited ] = useState({})

  useEffect( () => myLocalStorage.setItem(data), [data, myLocalStorage] )

  const updateState = (drag, dropzone) => setData([ 
    ...data.filter( postIt => postIt !== drag ), 
    { ...drag, state: dropzone }
  ])

  const insertPostIt = postIt => setData( [ ...data, postIt ] )

  const updatePostIt = ( postIt, index ) => {
    data[index] = postIt
    setData([ ...data ])
  }

  const removePostIt = postIt => {
    const index = data.indexOf(postIt)
    data.splice( index, 1 )
    setData([ ...data ])
  }

  function changePosition ( postIt, direction ) {
    const filterByState = data.filter( ({ state }) => postIt.state === state )
    const index = filterByState.indexOf(postIt)
    const postItBeside = filterByState[index+direction]

    if( postItBeside ){
      const postItIndex = data.indexOf(postIt)
      const postItBesideIndex = data.indexOf(postItBeside)

      data[postItIndex] = postItBeside
      data[postItBesideIndex] = postIt
      
      setData([...data])
    }
  }

  const params = {
    data,
    visible,
    edited,

    setEdited,
    setVisible,

    updateState,
    insertPostIt,
    removePostIt,
    updatePostIt,
    changePosition,
  }

  return (
    <DataContext.Provider value={params}>
      {children}
    </DataContext.Provider>
  )

}

export const useData = () => useContext(DataContext) 
