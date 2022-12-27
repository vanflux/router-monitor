import moment, { Moment } from "moment";

export function formatDDMMYYHHmmss(date: string | Date | Moment) {
  return moment(date).format('DD/MM/YY HH:mm:ss');
}
