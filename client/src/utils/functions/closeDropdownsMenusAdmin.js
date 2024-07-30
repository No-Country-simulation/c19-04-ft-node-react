export const closeDropdowns = (setDropdown) => () => {
  setDropdown({
    create: false,
    update: false,
    delete: false,
    toggle: false,
  });
};
