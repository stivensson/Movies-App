import React from 'react'
import { Pagination } from 'antd'

import './PaginationPage.css'

import { MoviesApiConsumer } from '../MoviesApiContext'

const PaginationPage = ({ getPages }) => {
  return (
    <MoviesApiConsumer>
      {({ page }) => {
        return (
          <div className="pagination">
            <Pagination showSizeChanger={false} defaultCurrent={1} current={page} total={100} onChange={getPages} />
          </div>
        )
      }}
    </MoviesApiConsumer>
  )
}

export default PaginationPage
