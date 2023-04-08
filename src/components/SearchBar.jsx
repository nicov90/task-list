import React, { useContext } from 'react'
import { GlobalContext } from '../App';

const SearchBar = () => {
  const {searchTextState} = useContext(GlobalContext);
  const {setSearchText} = searchTextState;

  return (
    <input 
      className='search-bar' 
      type="text"
      placeholder='Search...'
      onChange={(e)=> setSearchText(e.target.value)}
    ></input>
  )
}

export default SearchBar;