# nodejs-apache-kafka-producer-consumer
Node.js project showcasing Apache Kafka integration for seamless message communication. Includes Kafka producer and consumer components, illustrating efficient messaging system development with Node.js and Kafka.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
  - [Running the Producer](#running-the-producer)
  - [Running the Consumer](#running-the-consumer)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following:

- Node.js and npm installed
- Apache Kafka broker running (you can use [Confluent Platform](https://www.confluent.io/download/) or [Apache Kafka](https://kafka.apache.org/downloads))

## Getting Started

### Installation

**Install dependencies:**

1. Clone the repository:

   ```bash
   git clone <repository-url>

cd nodejs-apache-kafka-producer-consumer
npm install

**Configuration**
1. Create a .env file in the project root and configure your Kafka settings:
-KAFKA_CLIENT_ID=nodejs-kafka
-KAFKA_BROKERS=localhost:9092
-KAFKA_GROUP_ID=test-group

**docker-compose.yaml**
-docker-compose up -d


**Running the app cmd**

- npm run start



