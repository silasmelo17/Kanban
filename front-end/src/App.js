import React from 'react';

import List from './components/List/'
import Editor from './components/Editor'
import { DragNDropProvider } from './contexts/DragNDrop/'
import { DataProvider } from './contexts/Data/'

import './global.css'

function App() {

  const PostItDetail = () => (
    <svg className='recort'>
      <defs>
        <clipPath id="detail" clipPathUnits="objectBoundingBox">
          <path d='M 1 0 L 0 0 L 0 1 L 0.88 1 L 1 0.85 Z' />
        </clipPath>
      </defs>
    </svg>
  )

  const ContainerPostIts = () => (
    <div className='container'> 
      { [ 'to-do', 'in-progress', 'done' ].map( key => (
          <List key={key} title={key} />)) } 
    </div>
  )

  return (<>
    <h1 className='kanban-title'>Kanban Desk</h1>
    <DataProvider>

      <DragNDropProvider>
        <PostItDetail />
        <ContainerPostIts />
      </DragNDropProvider> 
      
      <Editor />
    </DataProvider>  
  </>)   

}

export default App;
