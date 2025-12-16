import React from 'react';
import { render, numberSetting, Space } from '@boardzilla/core';
import setup from '../game/index.js';
import { Token, ScoreCounter, Slot } from '../game/pieces/index.ts';
import { ChallengeCard } from '../game/pieces/challenges.ts';
import { StrategyCard } from '../game/pieces/strategies.ts';
import { EventCard } from '../game/pieces/events.ts';
import './style.scss';
// import '@boardzilla/core/index.css';

render(setup, {
  settings: {
    //tokens: numberSetting('Number of tokens', 4, 24),
  },
  layout: game => {
    // ---------------- Tokens ----------------
    game.all(Token).appearance({
      aspectRatio: 0.8,
      render: (Token) => (
        <div className="flipper">
          <div className="front">{Token.type}<br></br>{Token.quality}</div>
          <div className="back"></div>
        </div>
      )
    });

    // Style the individual token type spaces to be visible for debugging
    game.all('Data', 'Method', 'User', 'Aim').appearance({
      aspectRatio: 0,
      render: (space) => (
        <div className="token-type-space" data-type={space.name}>
          {space.isEmpty() && <span className="type-label">{space.name}</span>}
        </div>
      )
    });

    // Layout tokens within each type space
    game.all('Data', 'Method', 'User', 'Aim').layout(Token, {
      alignment: 'center'
    });

    game.all('pool').appearance({
      aspectRatio: 0,
      render: () => (
        <div className="pool-container">
          <span className="area-label">Tokens</span>
        </div>
      )
    });

    game.all('pool').layout(Token, {
      rows: 3,
      gap: 1,
      margin: 1
    });

    // ---------------- Challenge Deck & Cards ----------------
    game.all(ChallengeCard).appearance({
      aspectRatio: 0,
      render: (card) => (
        <div className="challenge-card">
          <h4>Challenge</h4>
          <p>{card.problem}</p>
        </div>
      )
    });

    game.all('challengeDeck').appearance({
      aspectRatio: 0,
      render: () => (
        <div className="challenge-deck-container">
          <span className="area-label">Challenges</span>
        </div>
      )
    });

    game.all('challengeDeck').layout(ChallengeCard, {
      rows: 3,
      columns: 2,
      gap: 0.5,
    });

    game.all('challengeSpace').appearance({
      aspectRatio: 0,
      render: () => (
        <div className="challenge-space-container">
          <span className="area-label">Current Challenge</span>
        </div>
      )
    });

    game.all('challengeSlots').appearance({
      aspectRatio: 0,
      render: () => (
        <div className="main-challenge-slots-container">
          <span className="area-label"></span>
        </div>
      )
    });

    game.all(Slot, {group: 'challengeslot'}).appearance({
      aspectRatio: 0,
      render: () => (
        <div className="challenge-slot-container">
          <span className="area-label"></span>
        </div>
      )
    });

    // Layout ChallengeCard to fill the slot (background layer)
    game.all(Slot, {group: 'challengeslot'}).layout(ChallengeCard, {
      rows: 1,
      columns: 1,
      margin: 0
    });

    // Layout tokenSpace as overlay on top of the challenge card
    game.all(Slot, {group: 'challengeslot'}).layout(Space, {
      rows: 1,
      columns: 1,
      margin: 0
    });

    // Style tokenSpace to be positioned as overlay
    game.all('tokenSpace').appearance({
      aspectRatio: 0,
      render: () => (
        <div className="token-space-overlay" />
      )
    });

    // Layout the 4 token type spaces (Data, Method, User, Aim) in a 2x2 grid
    game.all('tokenSpace').layout(Space, {
      rows: 2,
      columns: 2,
      gap: 0.2,
      margin: 0.5
    });


    // ---------------- Strategy Cards ----------------
    game.all('strategyDeck').appearance({
      aspectRatio: 0,
      render: () => (
        <div className="strategy-deck-container">
          <span className="area-label">Strategy Deck</span>
        </div>
      )
    });

    game.all('hand').appearance({
      aspectRatio: 0,
      render: () => (
        <div className="strategy-hand-container">
          <span className="area-label">Strategy Hand</span>
        </div>
      )
    });

    game.all('activeStrategies').appearance({
      aspectRatio: 0,
      render: () => (
        <div className="active-strategies-container">
          <span className="area-label"> Active Strategies </span>
        </div>
      )
    });

    game.all('activeStrategies').layout(StrategyCard, {
      rows: 3,
      columns: 3,
      gap: 0.5,
    });

    game.all(StrategyCard).appearance({
      aspectRatio: 0,
      render: (card) => (
        <div className="strategy-card">
          <p>Strategy:</p>
          <p>{card.name}</p>
        </div>
      )
    });

    // ---------------- Event Deck & Cards ----------------
    game.all(EventCard).appearance({
      aspectRatio: 0,
      render: (card) => (
        <div className="event-card">
          <h3>{card.type}</h3>
        </div>
      )
    });

    // Add this after the EventCard appearance definition
    game.all('eventDeck').appearance({
      aspectRatio: 0.75,
      render: () => (
          <div className="event-deck-container">
            <span className="area-label"> Event Deck </span>
          </div>
      )
    });

    game.all('eventDeck').layout(EventCard, {
      rows: 4,
      columns: 4,
      gap: 0.5,
    });

    // ---------------- Score ----------------
    game.appearance({
      render: () => (
        <div className="score-display">
     <div>Score: {game.players[0]?.score || 0}/{game.wincondition}</div>
     <div>Resources: {game.players[0]?.resources || 0}</div>
   </div>
      )
    });

    // // Background for score area
    // game.all('scoreArea').appearance({
    //   aspectRatio: 0,
    //   render: () => null
    // });

    // game.all(ScoreCounter).appearance({
    //   aspectRatio: 0,
    //   render: () => null
    // });


    // game.all('scoreArea').layout(ScoreCounter, {});

    // ---------------- Global Layout ----------------
    game.layout(
      game.all(Space),
      {
        gap: 1,
        margin: 1
      }
    );

    // Stack completed challenge cards and wasted resource tokens

    // Make the completed challenges area visible
    game.all('challengeCompleted').appearance({
      aspectRatio: 0,
      render: () => (
        <div className="completed-challenges-area">
          <span className="area-label">Resolved Challenges</span>
        </div>
      )
    });

    // Make the wasted resources area visible
    game.all('wastedResource').appearance({
      aspectRatio: 0,
      render: () => (
        <div className="wasted-resources-area">
          <span className="area-label"> Spent Resources </span>
        </div>
      )
    });

    // Make the discarded challenges area visible
    game.all('discarded').appearance({
      aspectRatio: 0,
      render: () => (
        <div className="discarded-area">
          <span className="area-label"> Discarded Challenges</span>
        </div>
      )
    });

    game.all('discarded').layout(ChallengeCard, {
      rows: {max: 1},
      offsetColumn: {x: 5, y: 5},
      direction: 'ltr',
    });

    game.all('challengeCompleted').layout(ChallengeCard, {
      rows: {max: 1},
      offsetColumn: {x: 5, y: 5},
      direction: 'ltr',
    });

    // Stack wasted resource tokens
    game.all('wastedResource').layout(Token, {
      rows: {max: 1},
      offsetColumn: {x: 5, y: 5},
      direction: 'ltr',
    });
  }
});
