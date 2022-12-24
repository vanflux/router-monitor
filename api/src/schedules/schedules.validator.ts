import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { isValidCron } from "cron-validator";

@ValidatorConstraint({ name: 'cron', async: false })
export class CronValidator implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return isValidCron(text || '');
  }

  defaultMessage(args: ValidationArguments) {
    return 'cron must follow cron syntax';
  }
}
