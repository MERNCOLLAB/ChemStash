// #E2E8F0 Gray0
// #94a3B8 Gray1
// #64748B  Gray2
// #F8FAFC White0
// #F1F5F9 White1
// #4F46E5 Indigo0

export const selectStyle = {
  control: (defaultStyle, state) => ({
    ...defaultStyle,
    backgroundColor: 'none',
    borderColor: state.isFocused ? '#4F46E5' : '#94A3B8',
    borderRadius: '8px',
    padding: '0px',
    color: '#64748B',
  }),

  singleValue: (defaultStyle) => ({
    ...defaultStyle,
    color: '#64748B',
  }),
  input: (defaultStyle) => ({
    ...defaultStyle,
    color: '#64748B',
  }),
  menu: (defaultStyle) => ({
    ...defaultStyle,
    backgroundColor: '#F1F5F9',
  }),
  option: (defaultStyle, state) => ({
    ...defaultStyle,
    backgroundColor: state.isFocused ? '#E2E8F0' : '#F8FAFC',
    color: '#64748B',
  }),
  placeholder: (defaultStyle) => ({
    ...defaultStyle,
    color: '#9ca3af',
  }),
};
