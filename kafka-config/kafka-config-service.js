import { Kafka } from "kafkajs";
import winston from 'winston';
import dotenv from 'dotenv';

// Load environment variables from a .env file
dotenv.config();

// Configure the logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    // Log to the console
    new winston.transports.Console(),
    // Log errors to a separate file
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // Log all messages to a combined file
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// Class for configuring Kafka
class KafkaConfig {
  constructor() {
    // Initialize Kafka with the provided client ID and broker addresses
    this.kafka = new Kafka({
      clientId: process.env.KAFKA_CLIENT_ID,
      brokers: [process.env.KAFKA_BROKERS],
    });

    // Create a Kafka producer instance
    this.producer = this.kafka.producer();

    // Create a Kafka consumer instance with a specified group ID
    this.consumer = this.kafka.consumer({ groupId: "test-group" });
  }

  // Produce messages to a Kafka topic
  async produce(topic, messages) {
    try {
      // Connect to the Kafka broker
      await this.producer.connect();

      // Send messages to the specified topic
      await this.producer.send({
        topic: topic,
        messages: messages,
      });

      // Log successful message production
      logger.info(`Produced messages to topic: ${topic}`);
    } catch (error) {
      // Log errors if message production fails
      logger.error(`Error producing messages to topic ${topic}: ${error.message}`);
    } finally {
      // Disconnect from the Kafka broker, regardless of success or failure
      await this.producer.disconnect();
    }
  }

  // Consume messages from a Kafka topic and invoke a callback for each message
  async consume(topic, callback) {
    try {
      // Connect to the Kafka broker
      await this.consumer.connect();

      // Subscribe to the specified topic, starting from the beginning
      await this.consumer.subscribe({ topic: topic, fromBeginning: true });

      // Run the consumer to process incoming messages
      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          // Convert the message value to a string
          const value = message.value.toString();

          // Invoke the provided callback with the message value
          callback(value);

          // Log successful message consumption
          logger.info(`Consumed message from topic ${topic}: ${value}`);
        },
      });
    } catch (error) {
      // Log errors if message consumption fails
      logger.error(`Error consuming messages from topic ${topic}: ${error.message}`);
    }
  }
}

// Export the KafkaConfig class for use in other modules
export default KafkaConfig;
