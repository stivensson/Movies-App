import React from 'react'
import { Alert } from 'antd'
import classNames from 'classnames'

import './RatedTab.css'
import CardList from '../CardList'
import PaginationPage from '../PaginationPage'
import { MoviesApiConsumer } from '../MoviesApiContext'

const RatedTab = ({ changeRating, getPages }) => {
  return (
    <MoviesApiConsumer>
      {({ ratingData, totalRatedPages, error }) => {
        return (
          <div className="rated-tab">
            <Alert
              className={classNames({ 'alert-error': error, 'alert-error__hidden': !error })}
              type="error"
              message="Ошибка"
              description="Попробуйте снова!"
              closable
              style={{ textAlign: 'center', fontSize: 18, fontWeight: 500 }}
            />
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
