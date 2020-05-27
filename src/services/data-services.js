import NotificationServices, {
  NOTIF_WISHLIST_CHANGED,
} from '../services/notification-services';

let ns = new NotificationServices();

let instance = null;
var wishlist = [];

class DataServices {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  itemOnWishlist = (item) => {
    for (var x = 0; x < wishlist.length; x++) {
      if (wishlist[x]._id === item._id) {
        return true;
      }
    }
    return false;
  };

  addWishlistItem = (item) => {
    wishlist.push(item);
    ns.postNotification(NOTIF_WISHLIST_CHANGED, wishlist);
  };

  removeWishlistItem = (item) => {
    for (var x = 0; x < wishlist.length; x++) {
      if (wishlist[x]._id === item._id) {
        wishlist.splice(x, 1);
        ns.postNotification(NOTIF_WISHLIST_CHANGED, wishlist);

        break;
      }
    }
  };
}

export default DataServices;
