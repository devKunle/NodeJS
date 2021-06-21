const mongodb = require('mongodb')
const getDb = require('../util/database').getDb;

class User {
    constructor(username, email, cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    save() {
        const db = getDb();
        return db
          .collection('users')
          .insertOne(this)
          .then(result => {
              console.log(result);
          })
          .catch(err => console.log(err));
    }

    addToCart(product) {
        // const cartProduct = this.cart.items.findIndex(p => p.id === product.id);
        console.log(product);
        const updatedCart = {
            items: [
                {
                    productId: new mongodb.ObjectId(product._id),
                    quantity: 1
                }
            ]
        };
        const db = getDb();
        return db
          .collection('users')
          .updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {cart: updatedCart}});

    }

    static findById(id) {
        const db = getDb();
        return db
          .collection('users')
          .findOne({_id: new mongodb.ObjectId(id)})
          .then(user => {
            console.log(user);
            return user;
        })
        .catch(err => console.log(err));
    }
}

module.exports = User;