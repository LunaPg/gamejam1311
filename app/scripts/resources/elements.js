define(function () {
  return [ {
      name: 'fire',
      status: 'unlocked',
      score: 1,
      count: 5,
      rank: 0,
      recipes: ['metal', 'disco', 'stone', 'planet'],
    }, {
      name: 'water',
      status: 'unlocked',
      score: 1,
      count: 5,
      rank: 0,
      recipes: ['wood', 'cloud', 'storm', 'eternal snow', 'thunder', 'stone', 'planet'],
    }, {
      name: 'wind',
      status: 'unlocked', 
      score: 1,
      count: 5,
      rank: 0,
      recipes: ['sand', 'cloud', 'disco', 'storm', 'eternal snow', 'planet'], 
    }, {
      name: 'earth',
      status: 'unlocked',
      score: 1,
      count: 5,
      rank: 0,
      recipes: ['metal', 'sand', 'wood', 'thunder', 'stone', 'planet'],
    }, {
      name: 'metal',
      status: 'locked',
      score: 5,
      count: 0,
      rank: 1,
      recipes:['lava', 'magnet'],
    }, {
      name: 'sand',
      status: 'locked',
      score: 5,
      count: 0,
      rank: 1,
      recipes: ['storm'],
    }, {
      name: 'wood',
      status: 'locked',
      score: 5,
      count: 0,
      rank: 1,
      recipes: ['oxygen']
    }, {
      name: 'cloud',
      status: 'locked',
      score: 5,
      count: 0,
      rank: 1,
      recipes: ['eternal snow', 'oxygen']
    }, {
      name: 'disco',
      status: 'locked',
      score: 10,
      count: 0,
      rank: 1,
      achievement: 'disco',
     }, {
      name: 'thunder',
      status: 'locked',
      score: 10,
      count: 0,
      rank: 2,
    }, {
      name: 'storm',
      status: 'locked',
      score: 10,
      count: 0,
      rank: 2,
      recipes: ['thunder', 'star', 'electricity']
    }
  ]
});
