import React from 'react'
import { format } from 'date-fns'
import { Button, Card, List, Rate, Avatar } from 'antd'

import no_poster from './no_poster.svg'
import './Cards.css'

const { Meta } = Card

const shortText = (text, number) => {
  return text.split(' ').slice(0, number).join(' ') + ' ...'
}

const Cards = ({
  poster,
  title,
  date,
  genre,
  overview,
  genreData,
  allRating,
  rating,
  changeRating,
  moviesId,
  guestId,
}) => {
  const genreList = []
  if (genre)
    genre.forEach((item) => {
      genreData.forEach((el) => {
        if (item === el.id) genreList.push(el.name)
      })
    })

  const colorRating = (num) => {
    if (num <= 3) return '#E90000'
    if (num > 3 && num <= 5) return '#E97E00'
    if (num > 5 && num <= 7) return '#E9D100'

    return '#66E900'
  }

  const onChangeRating = (e) => {
    if (moviesId && guestId) changeRating(moviesId, guestId, e)
  }

  return (
    <Card
      hoverable
      style={{ minWidth: 500, height: 300, display: 'flex', borderRadius: 0 }}
      cover={
        <img
          alt={`poster - ${title}`}
          src={!poster ? no_poster : `https://image.tmdb.org/t/p/w300${poster}`}
          style={{ width: 200, height: '100%', borderRadius: 0 }}
        />
      }
    >
      <List size="small" split={false}>
        <div className="card-title">
          <List.Item style={{ fontSize: 22, fontWeight: 500, padding: '0 0 10px 0' }}>
            {title.split(' ').length > 6 ? shortText(title, 5) : title}
          </List.Item>
          <Avatar
            size={32}
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: `3px solid ${colorRating(allRating)}`,
              padding: 15,
              fontSize: 14,
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              margin: '5px 5px 0 5px',
            }}
          >
            {allRating.toFixed(1)}
          </Avatar>
        </div>
        <List.Item style={{ fontSize: 16, padding: 0, paddingBottom: 10 }}>
          <Meta description={date ? format(new Date(date), 'MMMM dd, yyyy') : 'No date...'} />
        </List.Item>
        <List.Item style={{ justifyContent: 'flex-start', padding: 0, paddingBottom: 10 }}>
          {genreList.slice(0, 2).map((item) => (
            <Button style={{ width: 'auto', fontSize: 14, marginRight: 10 }} disabled key={item}>
              {item}
            </Button>
          ))}
        </List.Item>
        <List.Item style={{ fontSize: 16, fontWeight: 500, padding: '0 5px 0 0', lineHeight: 1.2 }}>
          {overview.split(' ').length > 20 ? shortText(overview, 19) : !overview ? 'No review...' : overview}
        </List.Item>
      </List>
      <Rate
        allowHalf
        count={10}
        defaultValue={rating}
        style={{ position: 'absolute', bottom: 20 }}
        onChange={onChangeRating}
      />
    </Card>
  )
}

export default Cards
