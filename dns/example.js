/*
	DNS 모듈은 크게 2가지의 범주로 구분된다.
	운영체제 하위에 기본적으로 제공되는 Name Resolution 기능을 활용하는 것과
	직접 DNS server에 연결해서 수행하는 기능으로 구분할 수 있다.
	
	하지만 전자의 경우 dns.lookup() 함수만이 포함된다.
	후자의 경우에는 dns.lookup()을 제외한 모든 기능이 포함된다.
	
	만일 타 어플리케이션들과 같이 운영체제 자체적으로 제공하는 기능을
	이용해서 name resolution을 수행하고 싶다면 dns.lookup()을 사용하면 된다.
*/

function first_example() {
	const dns = require('dns');
	
	dns.lookup('iana.org', (err, address, family) => {
		console.log('address: %j family: IPv%s', address, family);
	});
}

function first_training() {
	const dns = require('dns');
	dns.lookup('google.com', (err, address, family) => {
		console.log('address: %j, family: IPv%s', address, family);
	});
}

function dns_resolve() {
	const dns = require('dns');
	dns.resolve4('archive.org', (err, addresses) => {
		if (err) throw err;
		console.log(addresses);
	});
}

/*
	resolve 계열 함수는 해당 Domain Name을 사용해서 DNS Query를 통해
	해당되는 DNS의 IP를 어떠한 특정한 형식의 셋으로 반환하는 함수이며
	reverse()는 IP가 전달받았을 때 해당 IP가 어떤 Domain Name을 가지는지
	알아내기 위한 함수다.
*/

function dns_resolve_2() {
	const dns = require('dns');
	dns.resolve4('archive.org', (err, addresses) => {
		if (err) throw err;
		console.log(`addresses: ${JSON.stringify(addresses)}`);
		addresses.forEach((a) => {
			dns.reverse(a, (err, hostnames) => {
				if (err) throw err;
				console.log(`reverse for ${a}: ${JSON.stringify(hostnames)}`);
			});
		});
	});
}

// Resolver 클래스에서는 어떤 DNS서버에 질의할 것인지를 직접 정해줄 수 있다.

function resolver_class() {
	const { Resolver } = require('dns');
	const resolver = new Resolver();
	resolver.setServers(['4.4.4.4']);
	
	resolver.resolve4('google.com', (err, addresses) => {
		console.log(addresses);
	});
}

// lookupService() 함수는 해당 IP와 포트에 해당하는 호스트네임과 서비스를 반환한다.
function lookupService() {
	const dns = require('dns');
	dns.lookupService('127.0.0.1', 22, (err, hostname, service) => {
		console.log(hostname, service);
	});
}

function dnsResolveTTL() {
	const dns = require('dns');
	dns.resolve4('google.com', {ttl: 60}, (err, addresses) => {
		console.log(addresses);
	});
}

dnsResolveTTL();
//lookupService();
// resolver_class();