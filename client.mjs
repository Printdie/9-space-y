export class Client {
	/**
	 * Должен возвращать имя пользователя или null
	 * если пользователь не залогинен
	 *
	 * @return {Promise<string | null>} username
	 * */
	async getUser() {
		const response = await fetch('/api/user/');
		return response.text();
	}

	/**
	 * Должен логинить пользователя с именем username
	 * и возвращать его имя
	 *
	 * @param {string} username
	 * @return {Promise<string | null>} username
	 * */
	async loginUser(username) {
		const response = await fetch(`/api/login/?username=${username}`, {
			method: 'post',
		});
		return response.text();
	}

	/**
	 * Должен разлогинивать текущего пользователя
	 *
	 * @return {void}
	 * */
	async logoutUser() {
		await fetch(`/api/logout/`, {
			method: 'post',
		});
	}

	/**
	 * Должен возвращать информацию о компании
	 *
	 * @typedef {Object} Headquarters
	 * @property {string} address
	 * @property {string} city
	 * @property {string} state
	 *
	 * @typedef {Object} About
	 * @property {string} founder
	 * @property {string} founded
	 * @property {number} employees
	 * @property {string} ceo
	 * @property {string} coo
	 * @property {string} cto
	 * @property {number} valuation
	 * @property {Headquarters} headquarters
	 * @property {string} summary
	 * @return {Promise<About>}
	 * */
	async getInfo() {
		const response = await fetch('/api/info/');
		if (response.ok) {
			return response.json();
		}
	}

	/**
	 * Должен возвращать информацию о всех событиях
	 *
	 * @typedef {Object} EventBrief
	 * @property {number} id
	 * @property {string} title
	 *
	 * @return {Promise<EventBrief[]>}
	 * */
	async getHistory() {
		const response = await fetch('/api/history/');
		if (response.ok) {
			return response.json();
		}
	}

	/**
	 * Должен возвращать информацию о запрошенном событии
	 *
	 * @typedef {Object} EventFull
	 * @property {number} id
	 * @property {string} title
	 * @property {string} event_date_utc
	 * @property {string} details
	 * @property {Object.<string, ?string>} links
	 *
	 * @param {number} id
	 * @return {Promise<EventFull>}
	 * */
	async getHistoryEvent(id) {
		const response = await fetch(`/api/history/event/?id=${id}`);
		if (response.ok) {
			return response.json();
		}
	}

	/**
	 * Должен возвращать информацию о всех ракетах
	 *
	 * @typedef {Object} RocketBrief
	 * @property {number} rocket_id
	 * @property {string} rocket_name
	 *
	 * @return {Promise<RocketBrief[]>}
	 * */
	async getRockets() {
		const response = await fetch(`/api/rockets/`);
		if (response.ok) {
			return response.json();
		}
	}

	/**
	 * Должен возвращать информацию о запрошенной ракете
	 *
	 * @typedef {Object} RocketFull
	 * @property {number} rocket_id
	 * @property {string} rocket_name
	 * @property {string} first_flight
	 * @property {string} description
	 * @property {string} wikipedia
	 * @property {string[]} flickr_images
	 * Смотри источник данных:
	 * @property {Object} height
	 * @property {Object} diameter
	 * @property {Object} mass
	 * @property {Object} engines
	 * @property {Object} first_stage
	 * @property {Object} second_stage
	 *
	 * @param {string} id
	 * @return {Promise<RocketFull>}
	 * */
	async getRocket(id) {
		// const response = await fetch(`https://api.spacexdata.com/v4/rockets/${id}`);
		const response = await fetch(`/api/rocket/?id=${id}`);
		if (response.ok) {
			return response.json();
		}
	}

	/**
	 * Должен возвращать информацию о машине в космосе
	 *
	 * @typedef {Object} Roadster
	 * @property {string} name
	 * @property {string} launch_date_utc
	 * @property {string} details
	 * @property {number} earth_distance_km
	 * @property {number} mars_distance_km
	 * @property {string} wikipedia
	 *
	 * @return {Promise<Roadster>}
	 * */
	async getRoadster() {
		// const response = await fetch(`https://api.spacexdata.com/v4/roadster`);
		const response = await fetch(`/api/roadster/`);
		if (response.ok) {
			return response.json();
		}
	}

	/**
	 * Должен возвращать информацию о всех посланных на Марс предметах
	 *
	 * @typedef {Object} Item
	 * @property {!string} id
	 * @property {!string} name
	 * @property {!string} phone
	 * @property {?number} weight
	 * @property {?string} color
	 * @property {?boolean} important
	 *
	 * @return {Promise<Item[]>}
	 * */
	async getSentToMars() {
		const response = await fetch(`/api/dispatch/`);
		if (response.ok) {
			return response.json();
		}
	}

	/**
	 * Должен посылать на марс переданный предмет и
	 * возвращать информацию о всех посланных на Марс предметах
	 *
	 * @typedef {Object} ItemToSend
	 * @property {!string} name
	 * @property {!string} phone
	 * @property {?number} weight
	 * @property {?string} color
	 * @property {?boolean} important
	 *
	 * @param {ItemToSend} item
	 * @return {Promise<Item[]>}
	 * */
	async sendToMars(item) {
		const response = await fetch(`/api/dispatch/send/`, {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				item: item
			}),
		});
		if (response.ok) {
			return response.json();
		}
	}

	/**
	 * Должен отменять отправку на марс переданного предмета и
	 * возвращать информацию о всех посланных на Марс предметах
	 *
	 * @param {Item} item
	 * @return {Promise<Item[]>}
	 * */
	async cancelSendingToMars(item) {
		const response = await fetch(`/api/dispatch/cancel/`, {
			method: 'delete',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: item.id,
			}),
		});
		if (response.ok) {
			return response.json();
		}
	}
}