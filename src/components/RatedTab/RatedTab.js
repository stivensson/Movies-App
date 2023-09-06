import React from 'react'
import { Alert } from 'antd'

import './RatedTab.css'
import CardList from '../CardList'
import PaginationPage from '../PaginationPage'
import { MoviesApiConsumer } from '../MoviesApiContext'

const RatedTab = ({ changeRating, getPages }) => {
  return (
    <MoviesApiConsumer>
      {({ ratingData, totalRatedPages }) => {
        return (
          <div className="rated-tab">
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
