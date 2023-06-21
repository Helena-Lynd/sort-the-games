import React, { Fragment, useState }  from 'react';
import './app-style.css';

function DraggableBox() {
  return (
    <div className="text-square">
      <p>HALO</p>
    </div>
  );
}

function App() {  
  return (
    <Fragment>
      <div className="title">
        <span className="title-first-word">SORT</span>
        <span className="title-second-word">THE</span>
        <span className="title-third-word">GAMEDLE</span>
      </div>
      
      <div className="box-wrapper" draggable="true">
        <DraggableBox />
      </div>
    </Fragment>
  );
}

export default App;