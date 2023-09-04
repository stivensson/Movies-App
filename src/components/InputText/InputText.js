import React from 'react'
import { Input } from 'antd'

import './InputText.css'

import { MoviesApiConsumer } from '../MoviesApiContext'

const InputText = ({ inputText }) => {
  return (
    <MoviesApiConsumer>
      {({ search }) => {
        return (
          <Input style={{ marginBottom: 20 }} placeholder="Type to search..." value={search} onChange={inputText} />
        )
      }}
    </MoviesApiConsumer>
  )
}

export default InputText
