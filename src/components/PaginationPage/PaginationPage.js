import React from 'react'
import { Pagination } from 'antd'

import './PaginationPage.css'

import { MoviesApiConsumer } from '../MoviesApiContext'

const PaginationPage = ({ getPages, totalPages }) => {
  return (
    <MoviesApiConsumer>
      {({ page }) => {
        return (
          <div className="pagination">
            <Pagination
              showSizeChanger={false}
              defaultCurrent={1}
              current={page}
              total={totalPages}
              defaultPageSize={1}
              onChange={getPages}
            />
          </div>
        )
      }}
    </MoviesApiConsumer>
  )
}

export default PaginationPage
