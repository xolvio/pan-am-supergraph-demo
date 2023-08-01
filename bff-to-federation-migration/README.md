# Migrating from BFFs to GraphQL Federation
This repo contains code examples to accompany the blog post "Migrating from BFFs to a Federated GraphQL API".

## Overview
The blog post walks through an incremental migration path from a BFF architecture to a GraphQL federation API. It uses a fictional airline booking system as an example.

The migration focuses on a single feature - flight check-in - and goes through the following steps:

1. Feature investigation
2. Deduping read models
3. Modeling entities
4. Federating entities along domain boundaries

## Code Structure
The code examples are organized as follows:

`bffs/` - Contains the original BFFs for web, mobile, and kiosk clients

`services/` - Contains the migrated GraphQL services for flights, passengers, bookings

`federated-gateway/` - Contains the Apollo gateway

`demand-discovery/queries.graphql` - Ideal client GraphQL queries modeled in Step 3

## Running the Code

To run the BFFs:
```
cd bffs
npm install
npm start
```

To run the GraphQL services:
```
cd services/booking
npm install
npm start

cd services/flight
npm install
npm start

cd services/passenger
npm install
npm start
```

To run the gateway:
```
cd federated-gateway
npm install
npm start
```
The services run on ports 4001-4003 with the gateway on 4000.

## Additional Context
See the accompanying article [Migrating from BFFs to a Federated GraphQL API](https://www.xolv.io/blog/articles/how-to-move-from-bffs-to-graphql-federation/) for full details and explanation behind the migration process.
