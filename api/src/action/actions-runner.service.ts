import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ClientRestrictionService } from "src/client-restriction/client-restriction.service";
import { ActionLog, ActionLogDocument, ActionResult, Action, LogActionData, ClientRestrictionActiveActionData } from "./actions.entity";

@Injectable()
export class ActionsRunnerService {
  constructor(
    @InjectModel(ActionLog.name)
    private readonly actionLogModel: Model<ActionLogDocument>,
    private readonly clientRestrictionService: ClientRestrictionService,
  ) {}

	async run(action: Action): Promise<ActionResult> {
    const data = action.data;
    if (data instanceof LogActionData) {
      await this.actionLogModel.create({ message: data.message });
      return new ActionResult(true, { message: 'Log saved!' });
    } else if (data instanceof ClientRestrictionActiveActionData) {
      const { clientId, active } = data;
      const clientRestriction = await this.clientRestrictionService.getByClientId(data.clientId);
      if (clientRestriction) {
        await this.clientRestrictionService.update({ _id: clientRestriction.id!, active });
      } else {
        await this.clientRestrictionService.create({ clientId, active });
      }
    } else {
      return new ActionResult(false);
    }
	}
}
