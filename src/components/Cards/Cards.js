import React from 'react'
import { format } from 'date-fns'
import { Card, Button, List } from 'antd'

import './Cards.css'

const { Meta } = Card

const Cards = ({ poster, title, date, genre, overview }) => {
  const overviewShort = overview.split(' ').slice(0, 20).join(' ') + ' ...'
  return (
    <Card
      hoverable
      style={{ minWidth: 200, display: 'flex', borderRadius: 0 }}
      cover={
        <img
          src={poster ? `https://image.tmdb.org/t/p/w300${poster}` : '/no_poster.svg'}
          style={{ width: 280, borderRadius: 0 }}
        />
      }
    >
      <List size="small">
        <List.Item style={{ border: 0, fontSize: 28, fontWeight: 500, paddingTop: 0 }}>{title}</List.Item>
        <List.Item style={{ border: 0, fontSize: 18 }}>
          <Meta description={date ? format(new Date(date), 'MMMM dd, yyyy') : 'No date...'} />
        </List.Item>
        <List.Item style={{ border: 0, fontSize: 18 }}>
          <Button style={{ width: 100 }} disabled>
            {genre}
          </Button>
        </List.Item>
        <List.Item style={{ border: 0, fontSize: 18 }}>
          {overview.split(' ').length > 20 ? overviewShort : !overview ? 'No review...' : overview}
        </List.Item>
      </List>
    </Card>
  )
}

export default Cards
