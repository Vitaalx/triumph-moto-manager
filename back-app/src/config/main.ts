import "../env";

export default {
	API_PORT: ENV.PORT || 3000,
	MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017",
	DB_NAME: process.env.DB_NAME || "job-listing",
	REDIS_URI: process.env.REDIS_URI || "redis://localhost:6379",
	KAFKA_BROKER_LIST: process.env.KAFKA_BROKER_LIST || "localhost:9092",
	KAFKA_CONSUMER_GROUP_ID: process.env.KAFKA_CONSUMER_GROUP_ID || "cqrs-es",
	KAFKA_TOPICS_TO_SUBSCRIBE: process.env.KAFKA_TOPICS_TO_SUBSCRIBE || "application",
};
