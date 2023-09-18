import React from 'react'
import { Alert } from 'antd'

import './RatedTab.css'
import CardList from '../CardList'
import PaginationPage from '../PaginationPage'
import { MoviesApiConsumer } from '../MoviesApiContext'

const RatedTab = ({ changeRating, getPages, refreshPage }) => {
  return (
    <MoviesApiConsumer>
      {({ ratingData, totalRatedPages, error }) => {
        return (
          <div className="rated-tab">
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
            {!ratingData.length && (
              <Alert type="info" message="Нет оценённых фильмов !" style={{ textAlign: 'center' }} />
            )}
            <CardList changeRating={changeRating} data={ratingData} />
            {ratingData.length ? <PaginationPage getPages={getPages} totalPages={totalRatedPages} /> : null}
          </div>
        )
      }}
    </MoviesApiConsumer>
  )
}

export default RatedTab
