import { Types } from "mongoose";
import { InvalidInputId } from "src/exceptions/invalid-input-id.exception";


export function parseId(id: string): Types.ObjectId {
  try {
    return new Types.ObjectId(id);
  } catch (exc) {
    if (exc.name === 'BSONTypeError') throw new InvalidInputId();
    throw exc;
  }
}
