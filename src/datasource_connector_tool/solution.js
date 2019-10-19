// Problem 2
// Task: Implement a datasource connector to abstract away data retrieval and manipulation from the `ViewControllers`.
// Your solution shall use only [Vanilla JavaScript](http://vanilla-js.com).

class Price {
	/**
     * Price() attributes
     *
     * @param {number} buy
     * @param {number} sell
     * @param {string} pair
     */
    constructor(buy, sell, pair) {
        this.buy = buy;
        this.sell = sell;
        this.pair = pair;
    }

    /**
     * Return mid point between 2 integers as a decimal amount (buy and sell price)
     *
     * @return {number}
     */
	mid() {
        return ((this.buy + this.sell) / 2) / 100;
    }

    /**
     * Return the pair as a currency string
     *
     * @return {string}
     */
    quote() {
        return this.pair.substr(3, this.pair.length);
    }
}

class Datasource {
	/**
     * Return Promise with array of prices from datasource
     *
     * @return {Promise(Price[])}
     */
	getPrices() {
  	    return new Promise((resolve, reject) => {
            // Build request
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://pastebin.com/raw/KCJm3Kzb');

            // Handle response
            xhr.onload = () => {
                if (xhr.status != 200) {
                    reject(new Error(`Error: ${xhr.status}: ${xhr.statusText}`));
                } else {
                    // Build Price array from response (I couldn't connec to pastebin so I tested based on theoretical string response)
                    resolve(
                        JSON.parse(xhr.response).data.prices.map(item => {
                            return new Price(item.buy, item.sell, item.pair);
                        })
                    );
                }
            }

            // Handle error
            xhr.onerror = () => {
                reject(new Error('Error: Price fetch error occured'));
            };

            // Make request
            xhr.send();
        });
    }
}