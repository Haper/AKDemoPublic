

export const extractDataFromArray = <T extends { id: number }>(array: T[]) => {
  return array.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {} as Record<number, T>);
};
