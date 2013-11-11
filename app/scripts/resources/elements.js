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
      score: 5,
      rank: 1,
      recipes:['lava', 'magnet'],
    }, {
      name: 'sand',
      score: 5,
      rank: 1,
      recipes: ['storm'],
    }, {
      name: 'wood',
      score: 5,
      rank: 1,
      recipes: ['oxygen']
    }, {
      name: 'cloud',
      score: 5,
      rank: 1,
      recipes: ['eternal snow', 'oxygen']
    }, {
      name: 'disco',
      score: 10,
      rank: 1,
      achievement: 'disco',
     }, {
      name: 'thunder',
      score: 10,
      rank: 2,
    }, {
      name: 'storm',
      score: 10,
      rank: 2,
      recipes: ['thunder', 'star', 'electricity']
    }
  ]
});
