import { classApi } from '../classes.api';
import { CreditTotal } from '../types/global';

export const getCreditsTotal = async () => {
  // お気に入り登録した講義のリストを取得
  const favoriteList = await classApi.getClasses({ isFavorite: true, flags: [] });
  const total: CreditTotal = {};
  for (let favorite of favoriteList) {
    const department = favorite.department;
    const isZenkyo = favorite.id[1] === 'Z';
    // 全共の場合のみfieldで分類する
    const category = isZenkyo ? favorite.field.replace(/\(.+\)/g, '') : favorite.category;

    if (isZenkyo) {
      // 全共の場合で分野内の分類があれば切り出してタイトルの先頭に挿入
      // classApi内部のデータを上書きしないためにコピー
      favorite = { ...favorite };
      const subCategory = favorite.field.match(/\(.+\)/g);
      favorite.title = subCategory ? `【${subCategory[0].replace(/[()]/g, '')}】${favorite.title}` : favorite.title;
    }
    if (!total[department]) {
      total[department] = {};
    }
    if (!total[department][category]) {
      total[department][category] = [];
    }
    total[department][category].push(favorite);
  }
  return total;
};
