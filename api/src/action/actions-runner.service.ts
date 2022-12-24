import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ActionLog, ActionLogDocument, ActionResult, Action, LogActionData } from "./actions.entity";

@Injectable()
export class ActionsRunnerService {
  constructor(
    @InjectModel(ActionLog.name)
    private readonly actionLogModel: Model<ActionLogDocument>,
  ) {}

	async run(action: Action): Promise<ActionResult> {
    const data = action.data;
    if (data instanceof LogActionData) {
      await this.actionLogModel.create({ message: data.message });
      return new ActionResult(true, { message: 'Log saved!' });
    } else {
      return new ActionResult(false);
    }
	}
}
