const roles = ['chemist', 'tl', 'manager', 'purchacer'];

export const roleOptions = roles.map((role) => ({
  value: role,
  label: role.charAt(0).toUpperCase() + role.slice(1),
}));
