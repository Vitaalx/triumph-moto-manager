import useFastify from "fastify";
import "@config/env";
import "@providers/prisma";
import { handlerMaintenanceSendMail } from "./handlers/handler-maintenance-send-mail";

const fastify = useFastify({
	logger: true,
});

fastify.post(
	"/motorcycle-maintenances/:maintenanceId/send-mail",
	async(
		request,
		reply,
	) => handlerMaintenanceSendMail(request, reply),
);

fastify.listen({
	port: ENV.FASTIFY_PORT,
	host: ENV.FASTIFY_HOST,
}).then(() => {
	process.stdout.write(
		"====================================\n\n"
		+ "Server has started correctly on:\n\n"
		+ `- Port: ${ENV.FASTIFY_PORT}\n`
		+ `- Host: ${ENV.FASTIFY_HOST}\n`
		+ `- Environment: ${ENV.ENVIRONMENT}\n`
		+ `- Origin: ${ENV.ORIGIN}\n\n`
		+ "====================================\n",
	);
}).catch((err: unknown) => {
	fastify.log.error(err);
});
