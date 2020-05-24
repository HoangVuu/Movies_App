let initialState = [
  {
    id: 1,
    price: 220,
    inventory: 10,
    category: 'nike',
    releaseDate: '2020-03-11',
    feature: false,
    name: 'nike-1',
    img:
      'https://static.nike.com/a/images/w_960,c_limit,f_auto/c1ea6515-1008-42ef-a20b-1ab7b08bd75b/nike-x-stssy-air-zoom-spiridon-cage-2-fossil-release-date.png',
  },
  {
    id: 2,
    price: 120,
    inventory: 10,
    name: 'nike-2',
    category: 'nike',
    releaseDate: '2020-02-15',
    feature: true,
    img:
      'https://static.nike.com/a/images/w_960,c_limit,f_auto/6702e9f3-2a90-4886-b533-aa3a18a411d5/nike-x-stssy-air-zoom-spiridon-cage-2-pure-platinum-release-date.png',
  },
  {
    id: 3,
    price: 180,
    inventory: 10,
    category: 'nike',
    name: 'nike-3',
    releaseDate: '2020-02-20',
    feature: true,
    img:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/nike2-1573224114.png?crop=1.00xw:0.668xh;0,0.256xh&resize=480:*',
  },
  {
    id: 4,
    price: 200,
    inventory: 10,
    category: 'nike',
    name: 'nike-4',
    releaseDate: '2020-03-20',
    feature: false,
    img:
      'https://sneakerbardetroit.com/wp-content/uploads/2019/07/Nike-Air-Max-Plus-Triple-Red-CQ9748-600-Release-Date-1.png',
  },
  {
    id: 5,
    price: 290,
    inventory: 7,
    category: 'nike',
    name: 'nike-5',
    releaseDate: '2020-03-02',
    feature: false,
    img: 'https://wearecultivator.com/static/media/K8-Shoe.87eac9ee.png',
  },
];

const reducer = (state = initialState, action) => {
  return state;
};

export default reducer;
