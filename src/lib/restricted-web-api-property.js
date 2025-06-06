const mapApiToPropertySet = new Map([
  ['URL', new Set(['createObjectURL'])],
  // Navigator.gpu is restricted in service workers, but WorkerNavigator.gpu is allowed
  ['Navigator', new Set(['gpu'])],
  ['navigator', new Set(['gpu', 'xr'])],
]);

const isWebApiPropertyRestricted = (object, property) => {
  if (!mapApiToPropertySet.has(object)) {
    return false;
  }
  const propertySet = mapApiToPropertySet.get(object);
  return propertySet.has(property);
};

module.exports = {
  isWebApiPropertyRestricted,
};
