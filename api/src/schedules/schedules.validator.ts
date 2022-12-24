import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { isValidCron } from "cron-validator";

@ValidatorConstraint({ name: 'cron', async: false })
export class CronValidator implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return isValidCron(text, { seconds: true });
  }

  defaultMessage(args: ValidationArguments) {
    return 'Cron ($value) is not a valid cron!';
  }
}
