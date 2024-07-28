export const tagColorUtilities = {
  '.orangeTag': {
    color: '#F59E0B',
    backgroundColor: '#FDF0BC',
  },
  '.redTag': {
    color: '#F43F5E',
    backgroundColor: '#FFDDE0',
  },
  '.grayTag': {
    color: '#64748B',
    backgroundColor: '#CBD5E1',
  },
  '.greenTag': {
    color: '#059669',
    backgroundColor: '#A7F3D0',
  },
  '.blueTag': {
    color: '#3B82F6',
    backgroundColor: '#93C5FD',
  },
  '.lightGrayTag': {
    color: '#78716C',
    backgroundColor: '#D6D3D1',
  },
  '.purpleTag': {
    color: '#7C44C5',
    backgroundColor: '#CDB0F4',
  },
  '.pinkTag': {
    color: '#D233B8',
    backgroundColor: '#EECBEE',
  },
  '.blueGreenTag': {
    color: '#388BA5',
    backgroundColor: '#7CC6E8',
  },
};

// Function to be used at inventory column tags
function getTagClass(value) {
  switch (value) {
    case 'Flammable Storage Cabinet':
      return 'orangeTag';
    case 'Acid Storage Cabinet':
      return 'purpleTag';
    case 'Corrosive Storage Cabinet':
      return 'greenTag';
    case 'Alkaline Storage Cabinet':
      return 'pinkTag';
    case 'Refrigerator/Freezer':
      return 'blueGreenTag';
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
