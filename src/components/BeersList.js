import React from 'react';

function BeerItem({ beer }) {
  return (
    <div>
      <h5>{beer.name}</h5>
    </div>
  );
}

export default function BeersList({ beers }) {
  return (
    <div>
      {beers.map((beer) => (
        <BeerItem key={beer.id} beer={beer} />
      ))}
    </div>
  );
}
