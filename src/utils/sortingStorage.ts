const FAVORITE_ITEMS_KEY = 'ecoSortFavoriteWasteItems';
const ITEM_REQUESTS_KEY = 'ecoSortCustomItemRequests';

export interface CustomItemRequest {
  id: string;
  itemName: string;
  description: string;
  requestedAt: string;
  status: 'Pending' | 'Under Review' | 'Approved';
}

/**
 * Retrieves list of favorited waste item IDs.
 */
export const getFavoriteItemIds = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(FAVORITE_ITEMS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error('Failed to parse favorite items:', error);
    return [];
  }
};

/**
 * Toggles a waste item ID in favorites.
 */
export const toggleFavoriteItem = (itemId: string): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const current = getFavoriteItemIds();
    let updated: string[];
    if (current.includes(itemId)) {
      updated = current.filter((id) => id !== itemId);
    } else {
      updated = [...current, itemId];
    }
    localStorage.setItem(FAVORITE_ITEMS_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to toggle favorite item:', error);
    return getFavoriteItemIds();
  }
};

/**
 * Submits a custom waste item request to localStorage.
 */
export const submitCustomItemRequest = (itemName: string, description: string): CustomItemRequest => {
  const existing = getCustomItemRequests();
  const newReq: CustomItemRequest = {
    id: `req-${Date.now()}`,
    itemName,
    description,
    requestedAt: new Date().toISOString(),
    status: 'Under Review'
  };

  const updated = [newReq, ...existing];
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(ITEM_REQUESTS_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save custom item request:', error);
    }
  }
  return newReq;
};

/**
 * Retrieves all submitted custom waste item requests.
 */
export const getCustomItemRequests = (): CustomItemRequest[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ITEM_REQUESTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error('Failed to parse custom item requests:', error);
    return [];
  }
};
