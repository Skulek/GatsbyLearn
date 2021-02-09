import { graphql } from 'gatsby';
import React from 'react';
import BeersList from '../components/BeersList';
import SEO from '../components/SEO';

export default function BeersPage({ data }) {
  console.log('beer', data.beers);
  return (
    <>
      <SEO title={`We have ${data.beers.nodes.length}`} />
      <BeersList beers={data.beers.nodes} />
    </>
  );
}

export const query = graphql`
  query BeersQuery {
    beers: allBeer {
      nodes {
        image
        name
        price
        id
        rating {
          average
          reviews
        }
      }
    }
  }
`;
