export default class PagiService {
	static pagi(page, perPage, count) {
		return {
			pagination: {
				page: page,
				perPage: perPage,
				totalCount: count,
				totalPages: Math.ceil(count / perPage),
				pageCount: count <= perPage ? count : perPage,
			},
		};
	}
}
