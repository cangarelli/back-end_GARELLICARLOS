const queryGetter = (hook, ...params) => {
  const queryParams = params.reduce((obj, param) => {
    obj[param] = hook.get(param);
    return obj;
  }, {});

  return queryParams;
};

export default queryGetter;
