export function getUniqueTitle(baseTitle, list = []) {
  const existingTitles = new Set();

  const collectTitles = (items) => {
    items.forEach(item => {
      if (item.title) existingTitles.add(item.title);
      if (Array.isArray(item.childrenlist)) {
        collectTitles(item.childrenlist);
      }
    });
  };

  collectTitles(list); // 递归收集所有 title

  if (!existingTitles.has(baseTitle)) return baseTitle;

  const usedNumbers = new Set();
  const reg = new RegExp(`^${baseTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\((\\d+)\\))?$`);

  existingTitles.forEach(title => {
    const match = title.match(reg);
    if (match) {
      const num = match[2] ? Number(match[2]) : 0;
      usedNumbers.add(num);
    }
  });

  let i = 1;
  while (usedNumbers.has(i)) i++;

  return `${baseTitle}(${i})`;
}
