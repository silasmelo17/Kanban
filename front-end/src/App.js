import React from 'react';

import List from './components/List/'
import { DragNDropProvider } from './contexts/DragNDrop/'

import './global.css'

function App() {

  const getLists = () => [ 'to-do', 'in-progress', 'done' ]
    .map( key => (
      <List 
        key={key}
        title={key}
      />
    ))

  return (
    <DragNDropProvider>
      <div className='container'>
        { getLists() }
      </div>
    </DragNDropProvider>
  )

}

export default App;
