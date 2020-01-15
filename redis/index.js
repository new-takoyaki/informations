const redis = require('redis');
const client = redis.createClient();

// hash
client.hmset('friends', 'name', 'zero', 'age', 24);
client.hgetall('friends', (err, obj) => {
	console.log(obj);
});

// list
client.rpush('fruits', 'apple', 'orange', 'apple');
client.lpush('fruits', 'banana', 'pear');
client.lrange('fruits', 0, -1, (err, arr) => {
	console.log(arr);
});

// set
client.sadd('animals', 'dog', 'cat', 'bear', 'cat', 'lion');
client.smembers('animals', (err, set) => {
	console.log(set);
});

// sorted set
client.zadd('height', 180, 'zero', 168, 'aero', 176, 'nero', 172, 'hero');
client.zrange('height', 0, -1, (err, sset) => {
	console.log(sset);
});


// geo
client.geoadd('cities', 126.97, 37.56, 'seoul', 129.07, 35.17, 'busan',  126.70, 37.45);
client.geodist('cities', 'seoul', 'busan', (err, dist) => {
	console.log(dist);
});