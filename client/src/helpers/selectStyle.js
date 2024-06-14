export const selectStyle = {
  control: (defaultStyle) => ({
    ...defaultStyle,
    backgroundColor: '#0f172a',
    padding: '7px',
    color: '#fff',
  }),
  singleValue: (defaultStyle) => ({
    ...defaultStyle,
    color: '#fff',
  }),
  input: (defaultStyle) => ({
    ...defaultStyle,
    color: '#fff',
  }),
  menu: (defaultStyle) => ({
    ...defaultStyle,
    backgroundColor: '#0f172a',
  }),
  option: (defaultStyle, state) => ({
    ...defaultStyle,
    backgroundColor: state.isFocused ? '#4b5563' : '#1e293b',
    color: '#fff',
  }),
  placeholder: (defaultStyle) => ({
    ...defaultStyle,
    color: '#9ca3af',
  }),
};
