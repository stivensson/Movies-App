import React from 'react'
import { Alert } from 'antd'

import './SearchTab.css'

import InputText from '../InputText'
import GenreList from '../GenreList'
import PaginationPage from '../PaginationPage'
import CardList from '../CardList'
import { MoviesApiConsumer } from '../MoviesApiContext'

const SearchTab = ({ inputText, getPages, changeRating, refreshPage }) => {
  return (
    <MoviesApiConsumer>
      {({ moviesData, totalSearchPages, error }) => {
        return (
          <>
            <InputText inputText={inputText} />
            {error ? (
              <Alert
                className="alert-error"
                type="error"
                message="Ошибка"
                description="Попробуйте снова!"
                closable
                style={{ textAlign: 'center', fontSize: 18, fontWeight: 500 }}
                afterClose={refreshPage}
              />
            ) : null}
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
