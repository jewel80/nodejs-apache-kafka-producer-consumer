import KafkaConfig from "./kafka-config/kafka-config-service.js";

// Controller function to send a message to Kafka
const sendMessageToKafka = async (req, res) => {
  try {
    // Extract the message from the request body
    const { message } = req.body;

    // Prepare the message to be sent to Kafka with a key-value pair
    const messages = [{ key: "key1", value: message }];

    // Create an instance of KafkaConfig to interact with Kafka
    const kafkaConfig = new KafkaConfig();

    // Produce the message to the "my-topic" Kafka topic
    await kafkaConfig.produce("my-topic", messages);

    // Send a success response if the message is sent successfully
    res.status(200).json({
      status: "Ok!",
      message: "Message successfully sent!",
    });
  } catch (error) {
    // Log any errors that occur during message sending
    console.error(error);
    // Send an error response if there is an exception
    res.status(500).json({
      status: "Error",
      message: "Failed to send message to Kafka",
    });
  }
};

// Object containing all controller functions
const controllers = { sendMessageToKafka };

// Export the controllers object for use in other modules
export default controllers;
