import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Patch, Post, Res, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { RequiredRoles } from "../decorators/required-roles";
import { AuthGuard } from "../guards/auth.guard";
import { Response } from "express";
import { CreatePartsOrderDto } from "../dtos/parts-order/create";
import { CreatePartsOrderCommand } from "@application/command/definitions/create-parts-order";
import { StringTooShortError } from "@domain/errors/string-too-short";
import { SparePartNotFoundError } from "@domain/errors/spare-part/spare-part-not-found";
import { UpdatePartsOrderDto } from "../dtos/parts-order/update";
import { UpdatePartsOrderCommand } from "@application/command/definitions/update-parts-order";
import { PartsOrderNotFoundError } from "@domain/errors/parts-order/parts-order-not-found";
import { InvalidStatusPartsOrderError } from "@domain/errors/parts-order/invalid-status-parts-order";
import { DeletePartsOrderCommand } from "@application/command/definitions/delete-parts-order";
import { DeliverPartsOrderCommand } from "@application/command/definitions/deliver-parts-order";
import { GetPartsOrderQuery } from "@application/queries/definitions/get-parts-order";
import { GetPartsOrdersInDeliveryQuery } from "@application/queries/definitions/get-parts-orders-in-delivery";
import { GetPartsOrdersDeliveredQuery } from "@application/queries/definitions/get-parts-orders-delivered";
import { InvalidPartsOrderSparePartError } from "@domain/errors/parts-order/invalid-parts-order-spare-pare";

@Controller()
export class PartsOrderController {
	public constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Post("/parts-order")
	public async create(@Res() res: Response, @Body() createPartsOrderDto: CreatePartsOrderDto) {
		const { parts, supplierName } = createPartsOrderDto;

		const commandResult = await this.commandBus.execute(
			new CreatePartsOrderCommand(
				supplierName,
				parts,
			),
		);

		if (commandResult instanceof StringTooShortError) {
			throw new BadRequestException(commandResult.message);
		}

		if (commandResult instanceof SparePartNotFoundError) {
			throw new NotFoundException(commandResult.message);
		}

		return res.status(HttpStatus.CREATED).send();
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Patch("/parts-order/:partsOrderId")
	public async update(@Res() res: Response, @Param("partsOrderId") partsOrderId: string, @Body() updatePartsOrderDto: UpdatePartsOrderDto) {
		const { parts, supplierName } = updatePartsOrderDto;

		const commandResult = await this.commandBus.execute(
			new UpdatePartsOrderCommand(
				partsOrderId,
				supplierName,
				parts,
			),
		);

		if (commandResult instanceof StringTooShortError) {
			throw new BadRequestException(commandResult.message);
		}

		if (commandResult instanceof PartsOrderNotFoundError) {
			throw new NotFoundException(commandResult.message);
		}

		if (commandResult instanceof InvalidStatusPartsOrderError) {
			throw new BadRequestException(commandResult.message);
		}

		if (commandResult instanceof InvalidPartsOrderSparePartError) {
			throw new BadRequestException(commandResult.message);
		}

		return res.status(HttpStatus.OK).send(commandResult);
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Delete("/parts-order/:partsOrderId")
	public async delete(@Res() res: Response, @Param("partsOrderId") partsOrderId: string) {
		const commandResult = await this.commandBus.execute(
			new DeletePartsOrderCommand(partsOrderId),
		);

		if (commandResult instanceof PartsOrderNotFoundError) {
			throw new NotFoundException(commandResult.message);
		}

		if (commandResult instanceof InvalidStatusPartsOrderError) {
			throw new BadRequestException(commandResult.message);
		}

		return res.status(HttpStatus.NO_CONTENT).send();
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Patch("/parts-order/:partsOrderId/delivered")
	public async delivered(@Res() res: Response, @Param("partsOrderId") partsOrderId: string) {
		const commandResult = await this.commandBus.execute(
			new DeliverPartsOrderCommand(partsOrderId),
		);

		if (commandResult instanceof PartsOrderNotFoundError) {
			throw new NotFoundException(commandResult.message);
		}

		if (commandResult instanceof InvalidStatusPartsOrderError) {
			throw new BadRequestException(commandResult.message);
		}

		return res.status(HttpStatus.OK).send();
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Get("/parts-order/:partsOrderId")
	public async get(@Res() res: Response, @Param("partsOrderId") partsOrderId: string) {
		const partsOrder = await this.queryBus.execute(new GetPartsOrderQuery(partsOrderId));

		if (partsOrder instanceof PartsOrderNotFoundError) {
			throw new NotFoundException(partsOrder.message);
		}

		return res.status(HttpStatus.OK).json(partsOrder);
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Get("/parts-orders-in-delivery")
	public async getInDelivery(@Res() res: Response) {
		const partsOrders = await this.queryBus.execute(new GetPartsOrdersInDeliveryQuery());

		return res.status(HttpStatus.OK).json(partsOrders);
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Get("/parts-orders-delivered")
	public async getDelivered(@Res() res: Response) {
		const partsOrders = await this.queryBus.execute(new GetPartsOrdersDeliveredQuery());

		return res.status(HttpStatus.OK).json(partsOrders);
	}
}
