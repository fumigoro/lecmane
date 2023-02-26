export const zen2han = (text: string) => {
  let result = text.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
  });
  result = result.replace(/（/g, '(');
  result = result.replace(/）/g, ')');
  return result;
};

export const removeSpace = (text: string) => {
  return text.replace(/[\s　]/g, '');
};

export const shortRoomName = (text: string) => {
  let short = zen2han(text);
  short = removeSpace(short);
  return short;
};
