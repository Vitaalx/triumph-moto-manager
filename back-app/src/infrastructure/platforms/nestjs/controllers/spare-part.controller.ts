import {
	BadRequestException,
	Body,
	ConflictException,
	Controller,
	Delete,
	Get,
	HttpStatus,
	NotFoundException,
	Param,
	Patch,
	Post,
	Res,
	UseGuards,
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { RequiredRoles } from "../decorators/required-roles";
import { AuthGuard } from "../guards/auth.guard";
import { Response } from "express";
import { CreateSparePartDto } from "../dtos/spare-part/create";
import { CreateSparePartCommand } from "@application/command/definitions/create-spare-part";
import { StringTooShortError } from "@domain/errors/string-too-short";
import { InvalidSparePartPriceError } from "@domain/errors/spare-part/invalid-spare-part-price";
import { UpdateSparePartCommand } from "@application/command/definitions/update-spare-part";
import { UpdateSparePartDto } from "../dtos/spare-part/update";
import { SparePartNotFoundError } from "@domain/errors/spare-part/spare-part-not-found";
import { DeleteSparePartCommand } from "@application/command/definitions/delete-spare-part";
import { GetSparePartQuery } from "@application/queries/definitions/get-spare-part";
import { GetSparePartsQuery } from "@application/queries/definitions/get-spare-parts";
import { SparePartAlreadyExistsError } from "@domain/errors/spare-part/spare-part-already-exists";

@Controller()
export class SparePartController {
	public constructor(
		private readonly queryBus: QueryBus,
		private readonly commandBus: CommandBus,
	) {}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Post("spare-part")
	public async create(@Res() res: Response, @Body() createSparePartDto: CreateSparePartDto) {
		const { name, brand, refNumber, price, stock } = createSparePartDto;

		const commandResult = await this.commandBus.execute(
			new CreateSparePartCommand(
				name,
				brand,
				refNumber,
				stock,
				price,
			),
		);

		if (commandResult instanceof StringTooShortError) {
			throw new BadRequestException(commandResult.message);
		}

		if (commandResult instanceof InvalidSparePartPriceError) {
			throw new BadRequestException(commandResult.message);
		}

		if (commandResult instanceof SparePartAlreadyExistsError) {
			throw new ConflictException(commandResult.message);
		}

		res.status(HttpStatus.CREATED).send();
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Patch("spare-part/:sparePartId")
	public async update(@Res() res: Response, @Param("sparePartId") sparePartId: string, @Body() updateSparePartDto: UpdateSparePartDto) {
		const { name, brand, price, stock } = updateSparePartDto;

		const commandResult = await this.commandBus.execute(
			new UpdateSparePartCommand(
				sparePartId,
				name,
				brand,
				stock,
				price,
			),
		);

		if (commandResult instanceof StringTooShortError) {
			throw new BadRequestException(commandResult.message);
		}

		if (commandResult instanceof InvalidSparePartPriceError) {
			throw new BadRequestException(commandResult.message);
		}

		if (commandResult instanceof SparePartNotFoundError) {
			throw new NotFoundException(commandResult.message);
		}

		res.status(HttpStatus.OK).send();
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Delete("spare-part/:sparePartId")
	public async delete(@Res() res: Response, @Param("sparePartId") sparePartId: string) {
		const commandResult = await this.commandBus.execute(new DeleteSparePartCommand(sparePartId));

		if (commandResult instanceof SparePartNotFoundError) {
			throw new NotFoundException(commandResult.message);
		}

		res.status(HttpStatus.NO_CONTENT).send();
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Get("spare-part/:sparePartId")
	public async getSparePart(@Res() res: Response, @Param("sparePartId") sparePartId: string) {
		const queryResult = await this.queryBus.execute(new GetSparePartQuery(sparePartId));

		if (queryResult instanceof SparePartNotFoundError) {
			throw new NotFoundException(queryResult.message);
		}

		res.status(HttpStatus.OK).send(queryResult);
	}

	@RequiredRoles("FLEET_MANAGER")
	@UseGuards(AuthGuard)
	@Get("spare-parts")
	public async getSpareParts(@Res() res: Response) {
		const queryResult = await this.queryBus.execute(new GetSparePartsQuery());

		res.status(HttpStatus.OK).send(queryResult);
	}
}
