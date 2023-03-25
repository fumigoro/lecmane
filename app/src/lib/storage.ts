type StorageIOKey = {
  key: string;
  chunk: boolean;
};

// ローカルストレージ用のキーを指定
export class Key {
  /**
   * 検索用の講義一覧データ
   */
  public static CLASS_LIST: StorageIOKey = { key: 'lecmane_class_list', chunk: true };
  /**
   * 最後にサーバーへ更新の確認を行った時刻
   */
  public static LAST_FETCHED: StorageIOKey = { key: 'lecmane_class_data_last_fetched', chunk: false };
  /**
   * 現在ローカルにあるデータの更新日（＝バージョン）
   */
  public static DATA_TIMESTAMP: StorageIOKey = { key: 'lecmane_class_data_last_updated', chunk: false };
  /**
   * 検索クエリ
   */
  public static SEARCH_QUERY: StorageIOKey = { key: 'lecmane_search_query', chunk: false };
  /**
   * お気に入りリスト
   */
  public static FAVORITE_LIST: StorageIOKey = { key: 'lecmane_favorite_list', chunk: true };
}

//  LocalStorageAPIをラップする。5MBを超える巨大な文字列データの場合、分割してlocalStorageに出し入れするクラス。
export class StorageIO {
  /**
   * localStorageに巨大な文字を分割保存する
   * @param key
   * @param text
   */
  public static set(key: StorageIOKey, text: string) {
    if (key.chunk) {
      const chunkedText = this.chunk(text);
      localStorage.setItem(`${key.key}_n`, chunkedText.length.toString());
      chunkedText.forEach((d, i) => localStorage.setItem(`${key.key}_${i}`, d));
      return;
    }
    localStorage.setItem(key.key, text);
  }

  /**
   * 分割保存した文字列を取得する
   * @param key
   * @returns
   */
  public static get(key: StorageIOKey) {
    if (key.chunk) {
      const numString = localStorage.getItem(`${key.key}_n`);
      const num = Number(numString);
      if (!numString || Number.isNaN(num)) {
        return null;
      }
      const textList: string[] = [];
      for (let i = 0; i < num; i++) {
        const dataString = localStorage.getItem(`${key.key}_${i}`);
        if (!dataString) {
          return null;
        }
        textList.push(dataString);
      }
      return textList.join('');
    }
    return localStorage.getItem(key.key);
  }

  /**
   * 文字列を300万文字ごとに分割する
   * @param text
   * @returns
   */
  private static chunk(text: string) {
    const chunkSize = 3000000;
    const numOfChunks = Math.ceil(text.length / chunkSize);
    const chunked: string[] = [];
    for (let i = 0; i < numOfChunks; i++) {
      const start = i * chunkSize;
      chunked.push(text.substring(start, start + chunkSize));
    }
    return chunked;
  }
}
