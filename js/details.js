document.addEventListener('DOMContentLoaded', () => {

  /** Show/hide cart */
  const buttonsArray = document.querySelectorAll('.toggler');

  buttonsArray.forEach(element => {
    element.onclick = event => {
      const targetId = element.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      targetElement.classList.toggle('hidden');
    }
  });

  /** Quantity */
  const quantityElement = document.querySelector('.quantity');
  const add = quantityElement.querySelector('.add');
  const sub = quantityElement.querySelector('.sub');
  const qtd = quantityElement.querySelector('.quantity-value');

  add.onclick = e => {
    const newQtd = parseInt(qtd.innerText) + 1;
    qtd.innerHTML = newQtd;
  }
  sub.onclick = e => {
    const newQtd = parseInt(qtd.innerText) - 1;
    if (newQtd >= 0) qtd.innerHTML = newQtd;
  }
});
