import React from 'react'

import './SearchTab.css'

import InputText from '../InputText'
import GenreList from '../GenreList'
import PaginationPage from '../PaginationPage'
import CardList from '../CardList'
import { MoviesApiConsumer } from '../MoviesApiContext'

const SearchTab = ({ inputText, getPages, changeRating }) => {
  return (
    <MoviesApiConsumer>
      {({ moviesData, totalSearchPages }) => {
        return (
          <>
            <InputText inputText={inputText} />
            <div className="genre-list">
              <GenreList />
            </div>
            <CardList changeRating={changeRating} data={moviesData} />
            <PaginationPage getPages={getPages} totalPages={totalSearchPages} />
          </>
        )
      }}
    </MoviesApiConsumer>
  )
}

export default SearchTab
