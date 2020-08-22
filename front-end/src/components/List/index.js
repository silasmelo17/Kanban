import React from 'react'

import PostIt from '../Post-It'

import './style.css'

function List ({ title, data, updateData, setDrag }) {

  const preventDefault = event => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleDragEnter = event => {
    const { target } = event
    if( target.tagName === 'UL') {
      target.classList.add('drag-enter')
    }
  }

  const handleDragLeave = event => {
    const { target } = event
    if( target.tagName === 'UL') {
      target.classList.remove('drag-enter')
    }
  }

  const handleDrop = event => { 
    const { target } = event
    if( target.tagName === 'UL') {
      updateData( title )
      target.classList.remove('drag-enter')
    }
    setDrag({})
  }

  return(
    <section className='list-container'>
      <h1 className={title}>{title.replace('-', ' ')}</h1>
      <ul
        onDragOver={preventDefault} 
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop} 
      >

        {data.filter( ({state}) => state === title )
          .map( (postIt, index) => (
            <PostIt 
              key={index}
              value={postIt} 
              setDrag={setDrag} 
            />) 
          )}

      </ul>
    </section>
  )

}

export default List
