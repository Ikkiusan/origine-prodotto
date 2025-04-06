
let prodotti = [];
let ricercheRecenti = [];

window.onload = () => {
  fetch('prodotti.json')
    .then(response => response.json())
    .then(data => {
      prodotti = data;
      visualizzaProdotti();
    });

  if (localStorage.getItem('ricerche')) {
    ricercheRecenti = JSON.parse(localStorage.getItem('ricerche'));
    visualizzaRicercheRecenti();
  }
};

function visualizzaProdotti() {
  const listaProdotti = document.getElementById('lista-prodotti');
  listaProdotti.innerHTML = '';

  prodotti.forEach(prodotto => {
    const div = document.createElement('div');
    div.classList.add('prodotto');
    div.innerHTML = `
      <img src="${prodotto.immagine}" alt="${prodotto.nome}">
      <h3>${prodotto.nome}</h3>
      <p>Marca: ${prodotto.marca}</p>
      <button onclick="visualizzaDettagli('${prodotto.nome}')">Dettagli</button>
    `;
    listaProdotti.appendChild(div);
  });
}

function visualizzaDettagli(nomeProdotto) {
  const prodotto = prodotti.find(p => p.nome === nomeProdotto);
  if (prodotto) {
    document.getElementById('prodotto-imagen').innerHTML = `<img src="${prodotto.immagine}" alt="${prodotto.nome}">`;
    document.getElementById('prodotto-nome').innerText = prodotto.nome;
    document.getElementById('prodotto-marca').innerText = 'Marca: ' + prodotto.marca;
    document.getElementById('prodotto-origine').innerText = 'Origine: ' + prodotto.origine;
    document.getElementById('prodotto-produzione').innerText = 'Produzione: ' + prodotto.produzione;
    document.getElementById('prodotto-descrizione').innerText = prodotto.descrizione;
    document.getElementById('prodotto-details').classList.remove('hidden');
  }

  // Salva la ricerca recente
  ricercheRecenti.push(nomeProdotto);
  localStorage.setItem('ricerche', JSON.stringify(ricercheRecenti));
  visualizzaRicercheRecenti();
}

function visualizzaRicercheRecenti() {
  const listaRicerche = document.getElementById('lista-ricerche');
  listaRicerche.innerHTML = '<h3>Ricerche Recenti</h3>';

  ricercheRecenti.forEach(ricerca => {
    const p = document.createElement('p');
    p.innerText = ricerca;
    listaRicerche.appendChild(p);
  });
}

function goHome() {
  document.getElementById('prodotto-details').classList.add('hidden');
}
    