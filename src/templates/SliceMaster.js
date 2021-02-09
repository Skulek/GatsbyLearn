import { graphql } from 'gatsby';
import React from 'react';
import SEO from '../components/SEO';

export default function SliceMaster({ data: { slicemaster } }) {
  console.log(slicemaster);
  return (
    <>
      <SEO title={slicemaster.name} />
      <div>
        <h2> hello {slicemaster.name} </h2>
      </div>
    </>
  );
}

export const query = graphql`
  query($slug: String) {
    slicemaster: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      description
    }
  }
`;
