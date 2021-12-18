import React from 'react' 

const Filter = ({ newSearchString, handleSearchStringChange }) => {
  return (
    <div>
      Filter shown with <input
        value={newSearchString} 
        onChange={handleSearchStringChange} 
      />
    </div>
  )
}

export default Filter