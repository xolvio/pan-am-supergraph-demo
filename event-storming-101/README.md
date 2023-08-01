# Event Storming 101

This repo contains code examples to accompany the article [Event Storm to Production Supergraph: A Domain-Driven Design Approach to GraphQL](https://www.apollographql.com/blog/event-storm-to-production-supergraph-a-domain-driven-design-approach-to-graphql/).

## Overview

The article demonstrates using event storming and domain-driven design techniques to model a system and derive a GraphQL schema.

It uses a fictional airline system as an example, modeling loyalty, reservations, and flight operations domains.

## Code Structure

The code mirrors the example domains from the article:

- `reservations-service` - GraphQL microservice for reservations domain
- `flight-ops-service` - GraphQL microservice for flight operations domain
- `loyalty-service` - GraphQL microservice for loyalty domain
- `router` - Apollo gateway stitching services into a supergraph

## Running the Code

From each service folder:

```
npm install
npm start
```

The services run on ports 4001-4003.

Start the gateway last on port 4004:

```
cd router
npm install 
npm start
```

You can then query the supergraph API at http://localhost:4004.

## Additional Context

See the accompanying blog post for a full walkthrough of how event storming was used to model the domain and derive the GraphQL schemas for each service.

The `supergraph.graphql` schema shows how the services are stitched together into a unified graph using Apollo Gateway.