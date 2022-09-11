import { stringValueIsNumber } from "./string-util";

const formatHHmm = (value: string | undefined): string => {
  if (!value || value === "") return "";
  // hhmm形式で6文字以上はありえない
  if (value.length > 5) throw new Error();

  // 数値のみのパターン
  if (stringValueIsNumber(value)) {
    // 0900 => 09:00
    if (value.length === 4) {
      const hh = Number(value.substring(0, 2));
      const mm = Number(value.substring(2, 4));
      return toHHmm(hh, mm);
    }
    // 900 => 09:00
    if (value.length === 3) {
      const hh = Number(value.substring(0, 2));
      const mm = Number(value.substring(2, 3));
      return toHHmm(hh, mm);
    }
    if (value.length === 2 || value.length === 1) {
      return toHHmm(Number(value), 0);
    }
    throw new Error();
  }
  // コロンあり
  const splited = value.split(":");
  // 12:12:12 のような形式を弾く
  if (splited.length !== 2) throw new Error();

  const hh = splited[0];
  const mm = splited[1];
  // コロンが入っている文字列であればここまで到達する
  if (stringValueIsNumber(hh) && stringValueIsNumber(mm)) {
    return toHHmm(Number(hh), Number(mm));
  }
  throw new Error();
};

const toHHmm = (hh: number, mm: number): string => {
  let formatedHH: number = hh;
  if (hh >= 24) {
    // formatedHH = Math.floor(hh / 24);
    formatedHH = hh % 24;
  }

  let formatedmm: number = mm;
  if (hh >= 60) {
    formatedmm = hh % 60;
    formatedHH += Math.floor(hh / 60);
  }
  return `${formatedHH.toString().padStart(2, "0")}:${formatedmm
    .toString()
    .padStart(2, "0")}`;
};

export { formatHHmm };
