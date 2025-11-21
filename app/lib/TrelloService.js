import axios from 'axios';

const TRELLO_API_KEY = process.env.TRELLO_API_KEY;
const TRELLO_TOKEN = process.env.TRELLO_TOKEN;
const BASE_URL = 'https://api.trello.com/1';

export const TrelloService = {
    // Helper to get the first board
    getBoards: async () => {
        if (!TRELLO_API_KEY || !TRELLO_TOKEN) return [];
        try {
            const response = await axios.get(`${BASE_URL}/members/me/boards`, {
                params: { key: TRELLO_API_KEY, token: TRELLO_TOKEN }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching boards:", error.message);
            return [];
        }
    },

    // Helper to get lists on a board
    getLists: async (boardId) => {
        if (!TRELLO_API_KEY || !TRELLO_TOKEN) return [];
        try {
            const response = await axios.get(`${BASE_URL}/boards/${boardId}/lists`, {
                params: { key: TRELLO_API_KEY, token: TRELLO_TOKEN }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching lists:", error.message);
            return [];
        }
    },

    createCard: async (listId, name, desc) => {
        if (!TRELLO_API_KEY || !TRELLO_TOKEN) {
            console.warn("Trello API Key or Token missing. Returning mock response.");
            return { success: true, url: "https://trello.com/c/mock-card-id-missing-keys" };
        }

        try {
            let targetListId = listId;

            // If no listId provided, try to find one
            if (!targetListId) {
                const boards = await TrelloService.getBoards();
                if (boards.length > 0) {
                    const firstBoard = boards[0];
                    const lists = await TrelloService.getLists(firstBoard.id);
                    if (lists.length > 0) {
                        targetListId = lists[0].id;
                        console.log(`[Trello] Auto-selected list: ${lists[0].name} on board: ${firstBoard.name}`);
                    }
                }
            }

            if (!targetListId) {
                throw new Error("No list ID provided and could not auto-discover one.");
            }

            const response = await axios.post(`${BASE_URL}/cards`, null, {
                params: {
                    key: TRELLO_API_KEY,
                    token: TRELLO_TOKEN,
                    idList: targetListId,
                    name: name,
                    desc: desc
                }
            });

            return { success: true, url: response.data.url };

        } catch (error) {
            console.error("Trello API Error:", error.response?.data || error.message);
            throw error;
        }
    },

    createBoard: async (name) => {
        if (!TRELLO_API_KEY || !TRELLO_TOKEN) {
            return { success: true, url: "https://trello.com/b/mock-board-id" };
        }

        try {
            const response = await axios.post(`${BASE_URL}/boards`, null, {
                params: {
                    key: TRELLO_API_KEY,
                    token: TRELLO_TOKEN,
                    name: name,
                    defaultLists: true
                }
            });
            return { success: true, url: response.data.url };
        } catch (error) {
            console.error("Trello API Error:", error.response?.data || error.message);
            return { success: false, error: error.message };
        }
    }
};
