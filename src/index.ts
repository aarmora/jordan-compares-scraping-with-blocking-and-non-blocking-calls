import axios from 'axios';

const websites = [
	'https://amazon.com',
	'https://google.com',
	'https://www.reddit.com/r/Entrepreneur/comments/cwjkcm/launching_a_service_that_provides_business_leads/',
	'https://www.reddit.com/r/Entrepreneur/',
	'https://bing.com',
	'https://reddit.com',
	'https://linkedin.com',
	'https://yahoo.com',
	'https://www.reddit.com/r/funny/',
	'https://youtube.com',
	'https://twitter.com',
	'https://instagram.com',
	'https://www.amazon.com/dp/B07HB2KL4C',
	'https://www.amazon.com/dp/B01LTHP2ZK',
	'https://www.reddit.com/r/funny/comments/cwnmwv/not_a_huge_fan_of_the_new_candy_machine_at_work/',
	'https://boise.craigslist.org/',
	'https://boise.craigslist.org/d/office-commercial/search/off',
	'https://boise.craigslist.org/d/science-biotech/search/sci',
	'https://baidu.com',
	'https://msn.com',
	'https://www.ebay.com/deals/home-garden'

];

// scrapeWithAwait(websites);
scrapeWithoutAwait(websites);

async function scrapeWithoutAwait(websites: string[]) {

	const overallStartTime = new Date();
	const promises: any[] = [];
	for (let i = 0; i < websites.length; i++) {

		const startTime = new Date();
		promises.push(axios({
			method: 'GET',
			url: websites[i],
			headers: { 'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36 " },
			timeout: 7000
		}).then(axiosResponse => {
			console.log('successful axios call!', axiosResponse.status, Date.now() - +(startTime), websites[i]);
		}).catch(error => {
			if (error.response) {
				console.log('			Error getting website from response', websites[i], error.response.status);
				status = error.response.status;
			}
			else if (error.request) {
				console.log('			Error getting website from request', error.request.message, websites[i]);
			}
			else {
				console.log('			Eome other error', error.message);
			}

		}));
	}

	await Promise.all(promises);

	console.log('Finished without blocking calls', Date.now() - +(overallStartTime));
}

async function scrapeWithAwait(websites: string[]) {

	const overallStartTime = new Date();
	for (let i = 0; i < websites.length; i++) {

		const startTime = new Date();

		let axiosResponse;
		try {
			axiosResponse = await axios({
				method: 'GET',
				url: websites[i],
				headers: { 'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36 " },
				timeout: 7000
			});
			console.log('successful axios call!', axiosResponse.status, Date.now() - +(startTime), websites[i]);
		}
		catch (error) {
			if (error.response) {
				console.log('			Error getting website from response', websites[i], error.response.status);
				status = error.response.status;
			}
			else if (error.request) {
				console.log('			Error getting website from request', error.request.message, websites[i]);
			}
			else {
				console.log('			Eome other error', error.message);
			}

		};
	}

	console.log('Finished with blocking calls', Date.now() - +(overallStartTime));
}