//自动取名
// composables/useAvailableTitle.js
export function  generateUniqueTitle(base = '未命名', list = [], type = '列表') {
  const usedTitles = new Set();

  // 递归收集所有符合该 type 的 title（组 or 列表）
  const collectTitles = (items) => {
    items.forEach(item => {
      if (item.type === type && item.title) {
        usedTitles.add(item.title);
      }
      if (Array.isArray(item.childrenlist)) {
        collectTitles(item.childrenlist); // 继续找子项
      }
    });
  };

  collectTitles(list);

  // 提取 base(n) 格式
  const usedNumbers = new Set();
  const reg = new RegExp(`^${base}\\((\\d+)\\)$`);
  usedTitles.forEach(title => {
    const match = title.match(reg);
    if (match) {
      usedNumbers.add(Number(match[1]));
    }
  });

  // 找最小未用的编号
  let i = 1;
  while (usedNumbers.has(i)) i++;

  return `${base}(${i})`;
}
