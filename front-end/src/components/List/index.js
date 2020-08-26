import React from 'react'
import { FaPlus } from 'react-icons/fa'

import { useDragNDrop } from '../../contexts/DragNDrop'
import { useData } from '../../contexts/Data'

import PostIt from '../Post-It'

import './style.css'

function List ({ title }) {
  const { data, updateState, setVisible, setEdited } = useData()
  const { drag, setDrag } = useDragNDrop()



  const preventDefault = event => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleDragEnter = ({ target }) => {
    if( target.tagName === 'UL')
      target.classList.add('drag-enter')
  }

  const handleDragLeave = ({ target }) => {
    if( target.tagName === 'UL') 
      target.classList.remove('drag-enter')
  }

  const handleDrop = ({ target }) => { 
    if( target.tagName === 'UL') {
      updateState( drag, title )
      target.classList.remove('drag-enter')
    }
    setDrag()
  }

  const handleOnClickAdd = event => {
    setVisible(true)
    setEdited({ state: title })
  }



  const getPostIt = () => data
    .filter( ({state}) => state === title )
    .map( (postIt, index) => (
      <PostIt 
        key={index}
        value={postIt} 
      />) 
    )



  return(
    <section className={`list-container ${title}`}>
      <h1 className='name-list'>
        <span>{title.replace('-', ' ')}</span>
        <span>
          <FaPlus onClick={handleOnClickAdd} />
        </span>
      </h1>
      
      <ul
        onDragOver={preventDefault} 
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop} 
      > 
        {getPostIt()}
      </ul>
    </section>
  )

}

export default List
