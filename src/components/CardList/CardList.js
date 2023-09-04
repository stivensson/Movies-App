import React from 'react'
import { Col, Row, Spin, FloatButton } from 'antd'

import './CardList.css'

import Cards from '../Cards'
import { MoviesApiConsumer } from '../MoviesApiContext'

const CardList = ({ changeRating }) => {
  return (
    <MoviesApiConsumer>
      {({ moviesData, loading, genreData, guestId }) => {
        return (
          <>
            <Row gutter={[48, 48]}>
              {moviesData.map((item) => (
                <Col span={12} key={item.id}>
                  <Spin spinning={loading} tip="Загрузка..." size="large">
                    <Cards
                      poster={item.poster}
                      title={item.title}
                      date={item.date}
                      genre={item.genre}
                      overview={item.overview}
                      genreData={genreData}
                      allRating={item.allRating}
                      rating={item.rating}
                      changeRating={changeRating}
                      moviesId={item.id}
                      guestId={guestId}
                    />
                  </Spin>
                </Col>
              ))}
            </Row>
            <FloatButton.BackTop style={{ right: 250 }} />
          </>
        )
      }}
    </MoviesApiConsumer>
  )
}

export default CardList
