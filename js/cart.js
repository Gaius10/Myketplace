document.addEventListener('DOMContentLoaded', () => {

  const cart = {
    items: {},
    add(id, name, thumb, price, quantity) {
      const addedItem = { name, thumb, price, quantity };
      const oldItem = this.items[id];

      if (oldItem) addedItem.quantity += oldItem.quantity;
      this.items[id] = addedItem;
    },
    remove(id) {
      delete this.items[id];
    }
  }

  const renderer = {
    clear() {
      const listElement = document.querySelector("#cart ul");
      while (listElement.firstChild)
        listElement.removeChild(listElement.firstChild);
    },
    render(items) {
      const listElement = document.querySelector("#cart ul");

      const fragment = document.createDocumentFragment();
      if (!Object.keys(items).length) {
        // Add only an "Empty cart" element
        const li = document.createElement('li');
        li.classList.add('empty-cart');
        li.innerHTML = '<p>Your cart is empty</p>';
        fragment.appendChild(li);
      } else {
        // Render items
        Object.keys(items).forEach(key => {
          const item = items[key];

          const li = document.createElement('li');
          li.classList.add('cart-item');

          const thumb = document.createElement('img');
          thumb.src = item.thumb;
          thumb.alt = 'Product thumbnail';

          const info = document.createElement('div');
          info.classList.add('product-info');

          const name = document.createElement('span');
          name.classList.add('name');
          name.innerText = item.name;

          const price = document.createElement('span');
          price.classList.add('price');

          const unitPrice = document.createElement('span');
          unitPrice.classList.add('unit');

          const priceText = parseFloat(item.price)
            .toLocaleString('en-IN', {
              style: 'currency',
              currency: 'USD'
            })
          unitPrice.innerText = `${priceText} x ${item.quantity} `;

          const totalPrice = document.createElement('span');
          totalPrice.classList.add('total');

          const totalPriceText = (item.price * item.quantity)
            .toLocaleString('en-IN', {
              style: 'currency',
              currency: 'USD'
            });
          totalPrice.innerText = totalPriceText;

          price.appendChild(unitPrice);
          price.appendChild(totalPrice);

          info.appendChild(name);
          info.appendChild(price);

          const button = document.createElement('button');
          button.type = 'button';
          button.onclick = () => {
            cart.remove(key);
            renderer.clear();
            renderer.render(cart.items);
          }

          const buttonImage = document.createElement('img');
          buttonImage.src = './img/icon-delete.svg';
          buttonImage.alg = 'Delete';

          button.appendChild(buttonImage);

          li.appendChild(thumb);
          li.appendChild(info);
          li.appendChild(button);

          fragment.appendChild(li);
        });

        const checkoutLi = document.createElement('li');
        checkoutLi.classList.add('checkout-button');

        const checkoutButton = document.createElement('button');
        checkoutButton.type = 'button';
        checkoutButton.innerText = 'Checkout';

        checkoutLi.appendChild(checkoutButton);
        fragment.appendChild(checkoutLi);
      }

      listElement.appendChild(fragment);
    }
  }

  const addButton = document.querySelector('.add-to-cart');
  addButton.onclick = () => {
    const productId = 'XPTO-01';
    const productName = 'Fall Limited Edition Sneakers';
    const productThumb = './img/image-product-1-thumbnail.jpg';
    const productPrice = 125;
    const productQuantity = parseInt(
      document.querySelector('.quantity-value').innerText
    );

    if (!productQuantity) {
      console.log('No products, returning...'); 
      return;
    };

    cart.add(productId, productName, productThumb, productPrice, productQuantity);
    renderer.clear();
    renderer.render(cart.items);
  }

  renderer.clear();
  renderer.render(cart.items);
});
