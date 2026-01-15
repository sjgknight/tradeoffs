import React from 'react';
import { render, numberSetting, Space, PieceGrid, ProfileBadge, toggleSetting, times } from '@boardzilla/core';
import { Flippable } from '@boardzilla/core/components';
import setup from '../game/index.js';
import { Token, ScoreCounter, Slot } from '../game/pieces/index.ts';
import { ChallengeCard } from '../game/pieces/challenges.ts';
import { StrategyCard } from '../game/pieces/strategies.ts';
import { EventCard } from '../game/pieces/events.ts';
import './style.scss';
import { ConnectedSpaceMap } from '@boardzilla/core';
// import '@boardzilla/core/index.css';

 const multilineInfo = (text?: string) =>
  text
    ? text.split('\n').map((p, i) => <p key={i}>{p}</p>)
    : null;
    
    
  interface Rule {
  id: string
  title: string
  content: JSX.Element | ((game: any) => JSX.Element)
}

render(setup, {
  settings: {
    //tokens: numberSetting('Number of tokens', 4, 24),
  },
  
  
// info modal to show rules - this doesn't work. The infomodal can also be used to dynamically make rules available based on game state. 
      // Add infoModals here, at the same level as settings and layout
  infoModals: [
    {
      title: 'Game Rules',
      modal: (game) => (
        <>
          <h1>How to Play</h1>
          <p>Place tokens on challenge cards to complete them and earn points.</p>
          <h2>Token Types</h2>
          <ul>
            <li><strong>Data:</strong> Information sources</li>
            <li><strong>Method:</strong> Approaches and techniques</li>
            <li><strong>User:</strong> People affected</li>
            <li><strong>Aim:</strong> Goals and objectives</li>
          </ul>
        </>
      )
    }
  ],

  layout: (game) => {

//to remove after development
    game.showLayoutBoundingBoxes()


    // turn off debug layout
        game.disableDefaultAppearance();



    // ============================================
    // MAIN BOARD GRID LAYOUT
    // ============================================
    // Create a master grid that divides the screen into regions
    
    // Regions are:
    // challengeSpace, activeStrategies, hand, challengeCompleted, pool, eventDeck, discarded, strategyDeck, wastedResource
       
     // Top row: Challenge area (full width, 20% height)
    game.layout('challengeSpace', {
      area: { left: 0, top: 0, width: 90, height: 20 },
      scaling: 'fit' // Shrink cards to fit space
    });

    // Center: Active play area
    game.layout('activeStrategies', {
      area: { left: 0, top: 25, width: 90, height: 20 },
      scaling: 'fit' // Shrink cards to fit space
    });
    
     // Mid-left: Token pool
    game.layout('pool', {
      area: { left: 0, top: 50, width: 15, height: 20 },
      scaling: 'fit' // Shrink cards to fit space
    });
    
    // mid-Right column: Challenge and strategy deck
    game.layout('hand', {
      area: { left: 60, top: 50, width: 28, height: 20 },
      scaling: 'fit' // Shrink cards to fit space
    });

    // mid-center: Player hand
    game.layout('strategyDeck', {
      area: { left: 18, top: 50, width: 40, height: 38 },
      scaling: 'fit' // Shrink cards to fit space
    });

    // Bottom left: Discard/Wasted resources
    game.layout('wastedResource', {
      area: { left: 15, top: 90, width: 13, height: 10 },
      scaling: 'fit' // Shrink cards to fit space
    });

    game.layout('discarded', {
      area: { left: 30, top: 90, width: 13, height: 10 },
    });

    game.layout('challengeCompleted', {
      area: { left: 50, top: 90, width: 13, height: 10 },
    });
    
     game.layout('eventDeck', {
      area: { left: 60, top: 90, width: 15, height: 10 },
      scaling: 'fit' // Shrink cards to fit space
    });
    

 /*
 hello world
 */

    // ============================================
    // Token layout
    // ============================================
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
        alignment: 'center',
    });

    game.all('pool').appearance({
      aspectRatio: 0,
      render: () => (
        <div className="pool-container">
          <span className="area-label">Tokens</span>
        </div>
      )
    });

    // Pool: make tokens visually piled/haphazard on the left drawer
    game.all('pool').layout(Token, {
      // multiple small stacks with haphazard overlap for visual pile
    //  rows: 6,
    //  columns: 2,
      gap: 0,
      margin: 0,
      haphazardly: 3,
      maxOverlap: 0, //doesn't seem to be applying properly?
      alignment: 'left'
    });

    // ============================================
    // Deck layout
    // ============================================

    // ---------------- Challenge Deck & Cards ----------------
      game.all(ChallengeCard).appearance({
          aspectRatio: 0,
  render: (card) => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    
    return (
      <div className="challenge-card card-with-drawer">
        <div className="card-main" onClick={() => setDrawerOpen(!drawerOpen)}>
          <h4>Challenge</h4>
          <p>{card.problem}</p>
          <span className="expand-hint">{drawerOpen ? '◀' : '▶'}</span>
        </div>
        
        <div className={`card-drawer ${drawerOpen ? 'open' : ''}`}>
          <div className="drawer-content">
            <h4>{card.problem}</h4>
            {card.problem_detail && <p>{card.problem_detail}</p>}
            <p><strong>Points:</strong> {card.points}</p>
            <p><strong>Requirements:</strong> {card.requirements?.blocks} blocks</p>
            {card.requirements?.principles && card.requirements.principles.length > 0 && (
              <div>
                <strong>Principles:</strong>
                <ul>
                  {card.requirements.principles.map((p: any, i: number) => (
                    <li key={i}>{p.name} (value: {p.value})</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
          info: card => (
            <>
              {multilineInfo(card.problem)}
            </>
          )
        });
  
// alternative accordian option?  
/*
game.all(ChallengeCard).appearance({
  aspectRatio: 0,
  render: (card) => {
    const [expanded, setExpanded] = React.useState(false);
    
    return (
      <div className={`challenge-card ${expanded ? 'expanded' : ''}`} onClick={() => setExpanded(!expanded)}>
        <div className="card-header">
          <h4>Challenge</h4>
          <span className="toggle-icon">{expanded ? '−' : '+'}</span>
        </div>
        <p className="card-summary">{card.problem}</p>
        
        <div className={`card-details ${expanded ? 'open' : ''}`}>
          <div className="details-inner">
            {card.problem_detail && <p>{card.problem_detail}</p>}
            <p><strong>Points:</strong> {card.points}</p>
            <p><strong>Requirements:</strong> {card.requirements?.blocks} blocks</p>
            {card.requirements?.principles && card.requirements.principles.length > 0 && (
              <div>
                <strong>Principles:</strong>
                <ul>
                  {card.requirements.principles.map((p: any, i: number) => (
                    <li key={i}>{p.name} (value: {p.value})</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
*/

      game.all('challengeDeck').appearance({
          aspectRatio: .7,
          render: () => (
              <div className="challenge-deck-container">
                  <span className="area-label">Challenges</span>
              </div>
          )
      });

      // Layout cards inside the drawer
      game.all('challengeDeck')!.layout(ChallengeCard, {
          rows: 3,
          columns: 2,
          gap: 0.5,
          margin: 0.5
      });


    // challenge drawer: moved to right side and opens left
    game.layoutAsDrawer('challengeDeck', {
      area: {
        top: 67,
        left: 82,
        width: 16,
        height: 28,
      },
      openDirection: 'left',
    tab: (
      <div className="drawer-tab">
        Challenge Deck ({game.all('challengeDeck')!.all(ChallengeCard).length})
      </div>
    ),

    closedTab: (
      <div className="drawer-tab">
        Challenges
      </div>
    ),

    openIf: actions =>
      actions.some(a =>
        a.name === 'addChallenge' ||
        a.name === 'stashChallenge'
      ),

    closeIf: actions =>
      actions.every(a =>
        a.name !== 'addChallenge' &&
        a.name !== 'stashChallenge'
      ),
  });	

        // Create the drawer
        //This doesn't work. And it would need an OR in the openIf/closeIf for stashing a challenge.
    //  game.layoutAsDrawer('challengeDeck', {
    //     area: {
    //          top: 60,
    //          left: 30,
    //         width: 40,
    //         height: 40,
    //      },
    //      openDirection: 'up',
    //      tab: () => `Challenge Deck (${game.all('challengeDeck')!.all(ChallengeCard).length})`,
    //      openIf: actions => actions.some(a => a.name === 'addChallenge'),
    //      closeIf: actions => actions.every(a => a.name !== 'addChallenge'),
    //  });
     
     
    // ============================================
    // More deck layout
    // ============================================
    // Layout challenge slots so active challenges are a single row at the top
    // This positions the container across the top of the board and lays out slots in one row.
    
// Only appropriate if 'challengeSpace' is a grid/AdjacencySpace (e.g. SquareGrid)
// and you want to configure the underlying grid cells (not flexible child layouts).
game.all('challengeSpace')!.configureLayout({
  // The visual band on the board where the grid is rendered
  area: { left: 10, width: 80, top: 24, height: 70 },

  // Dimensions of the grid (controls how many fixed cells exist)
  rows: 1,
  columns: 3,
    direction: 'ltr',
  maxOverlap: 0,
  gap: {x: 10, y: 0}
});
      
    
// Position challengeSpace on screen (top 20%)
game.layout('challengeSpace', {
  area: { left: 0, top: 0, width: 100, height: 20 },
  rows: { max: 1 }
});

    
     // ============================================
    // CHALLENGE SPACE INTERNAL LAYOUT
    // ============================================  
    // Arrange the 3 slots in a row within challengeSpace
    game.all('challengeSlots').layout(Slot, {
      rows: 1,
      columns: 3,
      gap: 2,
    });
    

    
    game.all('challengeSpace').appearance({
      aspectRatio: 0,
      render: () => (
        <div className="challenge-space-container">
          <span className="area-label">Current Challenge</span>
        </div>
      )
    });
    
    // ---------------- Strategy Cards ----------------
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
      aspectRatio: .66,
      render: (card) => (
        <div className="event-card">
          <h3>{card.type}</h3>
        </div>
      )
    });

    // Add this after the EventCard appearance definition
    game.all('eventDeck').appearance({
      aspectRatio: .66,
      render: () => (
          <div className="event-deck-container">
            <span className="area-label"> Event Deck </span>
          </div>
      )
    });

    game.all('eventDeck').layout(EventCard, {
      rows: {max: 1},
            scaling: 'fit', // Shrink cards to fit space

      // columns: 1,
      gap: 0.2,
      offsetColumn: {x: 1, y: 1}, // Stack effect
      direction: 'rtl'
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
          <span className="area-label">Wasted Resources</span>
        </div>
      )
    });

    // Make the discarded challenges area visible
    game.all('discarded').appearance({
      aspectRatio: 0,
      render: () => (
        <div className="discarded-area">
          <span className="area-label">Discarded cards</span>
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
        haphazardly: 3,
    });
	
	
	
  }
});
