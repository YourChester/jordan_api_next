export default class PaginationService {
	static pagi(page, per_page, count) {
		return {
			total_item: count,
			total_pages: Math.ceil(count / per_page),
			current_page: page,
			current_per_page: per_page,
		};
	}
}
