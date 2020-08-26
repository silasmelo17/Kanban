import React from 'react';

import List from './components/List/'
import Editor from './components/Editor'
import { DragNDropProvider } from './contexts/DragNDrop/'
import { DataProvider } from './contexts/Data/'

import './global.css'

function App() {

  return (<>
    <h1 className='kanban-title'>Kanban Desk</h1>
    <DataProvider>
      <DragNDropProvider>
        <div className='container'> 
          { 
            [ 'to-do', 'in-progress', 'done' ].map( key => (
              <List key={key} title={key} />)) 
          } 
        </div> 
      </DragNDropProvider> 
      <Editor />
    </DataProvider>  
  </>)   

}

export default App;
