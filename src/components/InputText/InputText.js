import React from 'react'
import { Alert, Input } from 'antd'

import './InputText.css'

import { MoviesApiConsumer } from '../MoviesApiContext'

const InputText = ({ inputText }) => {
  return (
    <MoviesApiConsumer>
      {({ search, moviesData }) => {
        return (
          <>
            <Input style={{ marginBottom: 20 }} placeholder="Type to search..." value={search} onChange={inputText} />
            {search && !moviesData.length && (
              <Alert type="info" message="Ничего не найдено !" style={{ textAlign: 'center' }} />
            )}
          </>
        )
      }}
    </MoviesApiConsumer>
  )
}

export default InputText
