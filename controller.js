import KafkaConfig from "./kafka-service/kafka-config-service.js";

const sendMessageToKafka = async (req, res) => {
  try {
    const { message } = req.body;
    const messages = [{ key: "key1", value: message }];
    
    const kafkaConfig = new KafkaConfig();
    kafkaConfig.produce("my-topic", messages);

    res.status(200).json({
      status: "Ok!",
      message: "Message successfully send!",
    });
  } catch (error) {
    console.log(error);
  }
};

const constrollers = { sendMessageToKafka };

export default constrollers;
