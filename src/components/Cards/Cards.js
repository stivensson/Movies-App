import React from 'react'
import { format } from 'date-fns'
import { Card, Button, List } from 'antd'

import no_poster from './no_poster.svg'
import './Cards.css'

const { Meta } = Card

const shortText = (text, number) => {
  return text.split(' ').slice(0, number).join(' ') + ' ...'
}

const Cards = ({ poster, title, date, genre, overview }) => {
  return (
    <Card
      hoverable
      style={{ minWidth: 200, height: 300, display: 'flex', borderRadius: 0 }}
      cover={
        <img
          alt="poster"
          src={poster ? `https://image.tmdb.org/t/p/w300${poster}` : no_poster}
          style={{ width: 200, height: 300, borderRadius: 0 }}
        />
      }
    >
      <List size="small" split={false}>
        <List.Item style={{ fontSize: 26 }}>{title.split(' ').length > 6 ? shortText(title, 5) : title}</List.Item>
        <List.Item style={{ fontSize: 16 }}>
          <Meta description={date ? format(new Date(date), 'MMMM dd, yyyy') : 'No date...'} />
        </List.Item>
        <List.Item>
          <Button style={{ width: 70, fontSize: 14 }} disabled>
            {genre}
          </Button>
        </List.Item>
        <List.Item style={{ fontSize: 16, fontWeight: 500 }}>
          {overview.split(' ').length > 20 ? shortText(overview, 19) : !overview ? 'No review...' : overview}
        </List.Item>
      </List>
    </Card>
  )
}

export default Cards
