# DynamoDB Example App

This is an example NestJS application that uses AWS DynamoDB for data storage.

## Overview

The app manages two main entities - Owners and Fines. Owners can have multiple fines associated with them.

## Entities

### Owners

- id - Unique ID for the owner
- name - Name of the owner 
- licenseId - License ID of the owner

### Fines

- fineId - Unique ID for the fine
- userId - ID of the owner that received the fine
- fineType - Type of fine (speeding, parking etc)
- costValue - Cost value of the fine
- fineCreationDate - Date fine was created

## Endpoints

### Owners

- GET /owners - Get all owners
- GET /owners/:id - Get owner by ID
- POST /owners - Create new owner
- PUT /owners/:id - Update owner 
- DELETE /owners/:id - Delete owner

### Fines

- GET /fines/:userId - Get all fines for owner 
- GET /fines/:userId/:fineId - Get specific fine 
- POST /fines/:userId/create - Create new fine for owner
- PUT /fines/:userId/:fineId - Update specific fine
- DELETE /fines/:userId/:fineId - Delete specific fine

### PlatesController
The PlatesController is responsible for handling HTTP requests related to plates. It exposes the following endpoints:

- GET /plates - Get all plates
- GET /plates/:id - Get a plate by ID
- POST /plates - Create a new plate
- PUT /plates/:id - Update a plate
- DELETE /plates/:id - Delete a plate

## Running the app

This will start the DynamoDB container and app container.

The app will be available on http://localhost:3000.

Also config was done in order to conect whit an AWS acchitecture using IAM authentication, eviromental variables and a loadbalancer.



## Implementation Details

The app uses a layered architecture with controller, service and repository layers.

The controllers handle the HTTP requests and route them to the appropriate service method. 

The services contain the core business logic and call repository methods.

The repositories are responsible for database operations using the DynamoDB Document Client. 

Dependency injection is used to wire up the layers.