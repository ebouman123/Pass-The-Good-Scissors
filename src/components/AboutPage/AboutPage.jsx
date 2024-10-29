import React from 'react';
import { useSelector } from 'react-redux';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  const user = useSelector(store => store.user)

  return (
    <div className="container">
      <div>
        <p>This about page is for anyone to read!</p>
        <p>TEST</p>
      </div>
    </div>
  );
}

export default AboutPage;
