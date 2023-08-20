import React from 'react'

import './App.css'

import Header from '../Header'
import CardList from '../CardList/CardList'

export default class App extends React.Component {
  render() {
    return (
      <section>
        <Header />
        <CardList />
      </section>
    )
  }
}
