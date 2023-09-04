import React from 'react'
import { Col, Row, Button } from 'antd'

import './GenreList.css'

import { MoviesApiConsumer } from '../MoviesApiContext'

const GenreList = () => {
  return (
    <MoviesApiConsumer>
      {({ genreData, search }) => {
        return (
          <div className="genre-list">
            <Row gutter={[16, 8]} justify="space-evenly">
              {!search &&
                genreData.map((item) => (
                  <Col span={3} key={item.id}>
                    <Button style={{ width: 120 }}>{item.name}</Button>
                  </Col>
                ))}
            </Row>
          </div>
        )
      }}
    </MoviesApiConsumer>
  )
}

export default GenreList
