import React, { useState, useEffect } from 'react';

import List from './components/List/'
import getLocalStorage from './util/getLocalStorage'

import './global.css'

function App() {
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
    <div className='container'>
      {[ 'to-do', 'in-progress', 'done' ]
        .map( key => (<List 
          key={key}
          title={key}
          data={data}
          setDrag={setDrag}
          updateData={updateData}
        />))
      }
    </div>
  )

}

export default App;
