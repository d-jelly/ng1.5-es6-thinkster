export default class Articles {
	constructor(AppConstants, $http) {
		'ngInject';

		this._AppConstants = AppConstants;
		this._$http = $http;

	}

	// Creates an article
	save(article) {

		let request = {};

		// if theses a slug, perform an update via PUT w/ article's slug
		if (article.slug) {
			request.url = `${this._AppConstants.api}/articles/${article.slug}`;
			request.method = 'PUT';
			// delete the slug from the article to ensure the server updates the slug,
			// which happens if the title of the article changed.
			delete article.slug;
		
		// otherwise, this is a new article POST request
		} else {
			request.url = `${this._AppConstants.api}/articles`;
			request.method = 'POST';
		}

		// set the article data in the data attribute of our request
		request.data = { article: article };


		return this._$http(request).then((res) => res.data.article);
	}

	// retrieve a single article
	// GET method to the article service for retrieving a single article by its slug
	get(slug) {
		return this._$http({
			url: this._AppConstants.api + '/articles/' + slug,
			method: 'GET'
		}).then((res) => res.data.article);
	}
}