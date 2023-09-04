import React from 'react'

import './SearchTab.css'

import InputText from '../InputText'
import GenreList from '../GenreList'
import CardList from '../CardList'
import PaginationPage from '../PaginationPage'

const SearchTab = ({ inputText, getPages, changeRating }) => {
  return (
    <>
      <InputText inputText={inputText} />
      <GenreList />
      <CardList changeRating={changeRating} />
      <PaginationPage getPages={getPages} />
    </>
  )
}

export default SearchTab
