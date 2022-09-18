import { toYYYYMMDD } from "../../../common/util/date-util";
import { TimeRecordMethod, TimeRecordMethods } from "../TimeRecordMethod";

type GenerateKey = ({
  method,
  date,
}: {
  method: TimeRecordMethod;
  date: string;
}) => string;
const generateKey: GenerateKey = ({ method, date }) => `${method}-${date}`;

type GenerateKeys = ({
  methods,
  year,
  month,
  day,
}: {
  methods: TimeRecordMethods;
  year: string;
  month: string;
  day: string;
}) => string[];
const generateKeys: GenerateKeys = ({ methods, year, month, day }) =>
  methods.map((method) =>
    generateKey({
      method,
      date: toYYYYMMDD({ year, month, day }),
    })
  );

export { generateKey, generateKeys };
