const getTagColor = (categoryId) => {
  let color;

  switch (categoryId) {
    case 1:
      color = '#A2C7FE';
      break;
    case 2:
      color = '#D67676';
      break;
    case 3:
      color = '#94CFA1';
      break;
    case 4:
      color = '#C0B059';
      break;
    case 5:
      color = '#EEC4C4';
      break;
    case 6:
      color = '#87A7B3';
      break;
    case 7:
      color = '#766161';
      break;
    default:
      color = '#E1F1DD';
  }

  return color;
};

module.exports = {
  getTagColor,
};
