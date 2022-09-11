import dayjs from "dayjs";

type ToYYYYMMDD = ({
  year,
  month,
  day,
  delimiter,
}: {
  year: string;
  month: string;
  day: string;
  delimiter?: string;
}) => string;
const toYYYYMMDD: ToYYYYMMDD = ({ year, month, day, delimiter = "-" }) =>
  dayjs(`${year}-${month}-${day}`).format(`YYYY${delimiter}MM${delimiter}DD`);

export { toYYYYMMDD };
