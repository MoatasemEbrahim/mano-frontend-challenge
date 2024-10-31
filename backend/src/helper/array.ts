type GroupedPayload<T> = Map<string, T[]>;

export const groupByKeys = <T>(array: T[], keys: (keyof T)[]): GroupedPayload<T> => {
  return array.reduce((groupMap, item) => {

    const groupKey = keys.map(key => item[key]).join('-');
    
    if (!groupMap.has(groupKey)) {
      groupMap.set(groupKey, []);
    }
    
    groupMap.get(groupKey)!.push(item);
    
    return groupMap;
  }, new Map<string, T[]>());
};
