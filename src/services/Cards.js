import axios from "axios";

const API_URL = "https://api.elderscrollslegends.io/v1/cards";
const API_FETCH_ERROR = "API_ERROR";
const PAGE_SIZE = 100;

/**
 * Retrieve cards from ElderScrolls API.
 * Creates abstraction over transport layer, and 3rd party API.
 * @api
 * @param {object} options - params for API.
 * @returns {Promise<*>}
 */
export async function getCards(options) {
  const { pageSize = PAGE_SIZE, pageNum: page, searchTerm: name } = options;
  const params = { pageSize, page };

  if (name) {
    params.name = name;
  }

  try {
    const {
      data: { cards },
    } = await axios(API_URL, { params });

    return cards;
  } catch (err) {
    throw new Error(`${API_FETCH_ERROR}: ${err.message}`);
  }
}
