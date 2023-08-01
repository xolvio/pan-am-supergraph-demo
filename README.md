# Pan Am Demo Supergraph

This repo contains code examples to accompany blog posts on event storming and migrating from BFFs to GraphQL federation.

Pan Am airlines has dusted off their 1970s mainframe to provide some handy examples. Let's hope this new GraphQL system has a better flight plan than the real Pan Am. ✈️

## Contents

`event-storming-101/`

This folder contains the code demo for the article [Event Storm to Production Supergraph: A Domain-Driven Design Approach to GraphQL](https://www.xolv.io/blog/articles/event-storm-to-production-supergraph-a-domain-driven-design-approach-to-graphql/)

It showcases using event storming and domain-driven design to model a system and derive a GraphQL schema. The example models an airline loyalty system across flight reservations, flight operations, and loyalty domains.

`bff-to-federation-migration/`

This folder contains code examples for the article [Migrating from BFFs to a Federated GraphQL API](https://www.xolv.io/blog/articles/how-to-move-from-bffs-to-graphql-federation/)

It demonstrates an incremental migration approach from backend-for-frontend (BFF) services to a GraphQL federation architecture. The example focuses on migrating a flight check-in feature across web, mobile, and kiosk clients.

## Try It Yourself

Follow the README in each folder for instructions to run the code examples locally.

Just be careful not to accidentally shut down a real airline! Pan Am ran out of runway long ago so we're just pretending here.

Let us know if you have any other ideas for demonstrating GraphQL architectures and migrations using this fake airline demo schema!