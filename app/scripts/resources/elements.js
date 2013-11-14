define(function () {
  return [ {
      name: 'dust',
      status: 'locked',
      recipes: ['planet', 'life'],
      achievement: 'fail',
    }, {
      name: 'fire',
      status: 'unlocked',
      score: 1,
      count: 5,
      recipes: ['metal', 'disco', 'stone', 'planet'],
    }, {
      name: 'water',
      status: 'unlocked',
      score: 1,
      count: 5,
      recipes: ['wood', 'cloud', 'storm', 'eternal snow', 'thunder', 'stone', 'planet'],
    }, {
      name: 'wind',
      status: 'unlocked',
      score: 1,
      count: 5,
      recipes: ['sand', 'cloud', 'disco', 'storm', 'eternal snow', 'planet'], 
    }, {
      name: 'earth',
      status: 'unlocked',
      score: 1,
      count: 5,
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
    }, {
      name: 'lava',
      score: 10,
      rank: 2,
      recipes: ['star'],
    }, {
      name: 'stone',
      score: 10,
      rank: 2,
      recipes: ['gem'],
    }, {
      name: 'gas',
      score: 25,
      rank: 2,
      recipes: ['space'],
    }, {
      name: 'star',
      score: 25,
      rank: 3,
      recipes: ['sun'],
    }, {
      name: 'space',
      score: 25,
      rank: 3,
      recipes: ['sun'],
    }, {
      name: 'electricity',
      score: 25,
      rank: 3,
      achievement: 'electricity',
    }, {
      name: 'magnet',
      score: 25,
      rank: 3,
      recipes: ['electricity', 'time'],
    }, {
      name: 'gem',
      score: 100,
      rank: 3,
      achievement: 'gem',
    }, {
      name: 'sun',
      score: 100,
      rank: 4,
      recipes: ['life'],
    }, {
      name: 'planet',
      score: 100,
      rank: 4,
      recipes: ['life'],
    }, {
      name: 'time',
      score: 100,
      rank: 4,
      recipes: ['life'],
    }, {
      name: 'life',
      score: 500,
      rank: 4,
      achievement: 'win',
    }
  ]
});
