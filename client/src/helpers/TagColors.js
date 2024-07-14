export const tagColorUtilities = {
  '.orangeTag': {
    color: '#F59E0B',
    backgroundColor: '#FDF0BC',
    fontSize: '10px',
  },
  '.redTag': {
    color: '#F43F5E',
    backgroundColor: '#FFDDE0',
    fontSize: '10px',
  },
  '.grayTag': {
    color: '#64748B',
    backgroundColor: '#CBD5E1',
    fontSize: '10px',
  },
  '.greenTag': {
    color: '#059669',
    backgroundColor: '#A7F3D0',
    fontSize: '10px',
  },
  '.blueTag': {
    color: '#3B82F6',
    backgroundColor: '#93C5FD',
    fontSize: '10px',
  },
  '.lightGrayTag': {
    color: '#78716C',
    backgroundColor: '#D6D3D1',
    fontSize: '10px',
  },
};

// Function to be used at inventory column tags
function getTagClass(value) {
  switch (value) {
    case 'Flammable Storage Cabinet':
      return 'orangeTag';
    case 'Corrosive Storage Cabinet':
      return 'greenTag';
    case 'Refrigerator/Freezer':
      return 'grayTag';
    case 'General Storage Shelf':
      return 'blueTag';
    case 'Oxidizer Storage Shelf':
      return 'redTag';
    case 'Gas Cylinder Storage':
      return 'lightGrayTag';
    default:
      return 'lightGrayTag';
  }
}

export default getTagClass;
