import { type MaintenanceMailParams, type IEmailService, type SparePartMailParams, type MaintenanceReminderMailParams } from "@application/ports/services/email-service";
import { ErrorSendingMail } from "@domain/errors/error-sending-mail";

interface BrevoMailRequestBody {
	to: { email: string }[];
	templateId: number;
	params: {
		maintenance?: MaintenanceMailParams | MaintenanceReminderMailParams;
		sparePart?: SparePartMailParams;
	};
}

interface BrevoMailRequest {
	method: "POST";
	headers: {
		"Content-Type": "application/json";
		"api-key": string;
	};
	body: string;
}

export class BrevoMailSender implements IEmailService {
	private readonly apiUrl = ENV.BREVO_API_MAIL_URL;

	public async sendMotorcycleMaintenance(maintenance: MaintenanceMailParams, email: string) {
		const templateId = 2;

		const body: BrevoMailRequestBody = {
			to: [{ email }],
			templateId,
			params: {
				maintenance,
			},
		};

		const response = await fetch(this.apiUrl, this.getBrevoRequest(body));

		if (response.status !== 201) {
			return new ErrorSendingMail();
		}

		return "sent";
	}

	public async sendMotorcycleMaintenanceReminder(maintenance: MaintenanceReminderMailParams, email: string) {
		const templateId = 1;

		const body: BrevoMailRequestBody = {
			to: [{ email }],
			templateId,
			params: {
				maintenance,
			},
		};

		const response = await fetch(this.apiUrl, this.getBrevoRequest(body));

		if (response.status !== 201) {
			return new Error(`Error sending mail to : ${email}`);
		}

		return "sent";
	}

	public async sendSparePartLowStock(sparePart: SparePartMailParams) {
		const templateId = 3;
		const email = ENV.APP_ADMIN_EMAIL;

		const body: BrevoMailRequestBody = {
			to: [{ email }],
			templateId,
			params: {
				sparePart,
			},
		};

		const response = await fetch(this.apiUrl, this.getBrevoRequest(body));

		if (response.status !== 201) {
			return new Error(`Error sending mail to : ${email}`);
		}

		return "sent";
	}

	private getBrevoRequest(body: BrevoMailRequestBody) {
		return {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"api-key": ENV.BREVO_API_KEY,
			},
			body: JSON.stringify(body),
		} as BrevoMailRequest;
	}
}
