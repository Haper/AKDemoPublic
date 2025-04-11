export const paramsToUrlString = (params: object | string): string => {
  if (typeof params === 'string') return params;

  return Object.keys(params)
    .map(key => {
      const param = (params as any)[key];
      if (Array.isArray(param)) {
        return (param as any[]).map(item => `${key}=${String(item)}`).join('&');

      } else if (typeof param === 'object') {
        const nestedKeys = Object.keys(param);
        return nestedKeys.map(nestedKey => `${key}[${nestedKey}]=${String(param[nestedKey])}`).join('&');
      }

      return `${key}=${String(param)}`;
    })
    .join('&');
};
