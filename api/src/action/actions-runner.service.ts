import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ActionLog, ActionLogDocument, ActionResult, BaseAction, LogAction } from "./actions.entity";

@Injectable()
export class ActionsRunnerService {
  constructor(
    @InjectModel(ActionLog.name)
    private readonly actionLogModel: Model<ActionLogDocument>,
  ) {}

	async run(action: BaseAction): Promise<ActionResult> {
    if (action instanceof LogAction) {
      await this.actionLogModel.create({ message: action.message });
      return new ActionResult(true, { message: 'Log saved!' });
    } else {
      return new ActionResult(false);
    }
	}
}
