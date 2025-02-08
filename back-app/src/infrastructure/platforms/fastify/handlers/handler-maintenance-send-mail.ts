import { type MaintenanceMailParams } from "@application/ports/services/email-service";
import { type FastifyReply, type FastifyRequest } from "fastify";
import { BrevoMailSender } from "../adapters/services/brevo-mail-sender";

const mailSender = new BrevoMailSender();

export async function handlerMaintenanceSendMail(request: FastifyRequest, reply: FastifyReply) {
	const { maintenanceId } = request.params as { maintenanceId: string };
	const maintenance = await prisma.motorcycleMaintenance.findUnique({
		where: {
			id: maintenanceId,
		},
		include: {
			usedSpareParts: {
				select: {
					sparePart: {
						select: {
							name: true,
							price: true,
						},
					},
					quantity: true,
				},
			},
			driverSheet: {
				select: {
					email: true,
					fullName: true,
				},
			},
		},
	});

	if (maintenance === null) {
		return reply.status(404).send("Maintenance not found");
	}

	if (maintenance.status !== "CLOSED") {
		return reply.status(400).send("Maintenance is not closed");
	}

	const params: MaintenanceMailParams = {
		id: maintenance.id,
		driverFullName: maintenance.driverSheet.fullName,
		motorcycleId: maintenance.motorcycleId,
		technicalRecommendations: maintenance.technicalRecommendations,
		usedSpareParts: maintenance.usedSpareParts.map((usedSparePart) => ({
			name: usedSparePart.sparePart.name,
			quantity: usedSparePart.quantity,
			price: usedSparePart.sparePart.price,
		})),
		totalSparePartsPrice: maintenance.totalSparePartsPrice,
		totalMaintenancePrice: maintenance.totalMaintenancePrice,
		laborPrice: maintenance.laborPrice,
		date: maintenance.date.toISOString().split("T")[0],
	};

	const isSent = await mailSender.sendMotorcycleMaintenance(params, maintenance.driverSheet.email);

	if (isSent instanceof Error) {
		return reply.status(500).send(isSent.message);
	}

	reply.status(200).send();
}
