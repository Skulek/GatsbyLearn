import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');

  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      // pass down data by context.
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
  const sliceMastersTemplate = path.resolve('./src/pages/slicemasters.js');
  const sliceMasterTemplate = path.resolve('./src/templates/sliceMaster.js');

  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  console.log(pageCount);
  Array.from({ length: pageCount }).forEach((_, i) => {
    console.log(`create page ${i}`);
    actions.createPage({
      path: `slicemasters/${i + 1}`,
      component: sliceMastersTemplate,
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
  data.slicemasters.nodes.forEach((person) => {
    console.log(`create page for ${person.name}`);
    actions.createPage({
      path: `slicemaster/${person.slug.current}`,
      component: sliceMasterTemplate,
      // pass down data by context.
      context: {
        slug: person.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');

  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
        }
      }
    }
  `);
  data.toppings.nodes.forEach((topping) => {
    console.log(topping);
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      // pass down data by context.
      context: {
        toppingName: topping.name,
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
}

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  const { createNode } = actions;
  const baseURL = 'https://api.sampleapis.com/beers/ale';

  const res = await fetch(baseURL);
  const beers = await res.json();
  beers.forEach((beer) => {
    const nodeMeta = {
      id: createNodeId(`my-data-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: `Beer`,
        mediaType: `application/json`,
        content: JSON.stringify(beer),
        contentDigest: createContentDigest(beer),
      },
    };

    const node = { ...beer, ...nodeMeta };
    createNode(node);
  });
}

export async function sourceNodes(params) {
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ]);
}
