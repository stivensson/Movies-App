import React from 'react'
import { Col, Row, Spin, FloatButton } from 'antd'

import './SearchTab.css'

import InputText from '../InputText'
import GenreList from '../GenreList'
import PaginationPage from '../PaginationPage'
import Cards from '../Cards'
import { MoviesApiConsumer } from '../MoviesApiContext'

const SearchTab = ({ inputText, getPages, changeRating }) => {
  return (
    <MoviesApiConsumer>
      {({ moviesData, loading, genreData, guestId }) => {
        return (
          <>
            <InputText inputText={inputText} />
            <GenreList />
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
            <PaginationPage getPages={getPages} />
          </>
        )
      }}
    </MoviesApiConsumer>
  )
}

export default SearchTab
