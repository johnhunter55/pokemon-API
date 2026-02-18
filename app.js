async function fetchPokemon() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?");
  const data = await res.json();

  const firstRes = await fetch(data.results[0].url);
  const firstData = await firstRes.json();
  document.getElementById("pokemon-image").src =
    firstData.sprites.front_default;

  document.getElementById("pokemon-info").innerText =
    `Name: ${firstData.name}\nHeight: ${firstData.height}\nWeight: ${firstData.weight}`;

  //   for (let i = 0; i < data.results.length; i++) {
  //     const re2 = await fetch(data.results[i].url);
  //     const data2 = await re2.json();
  //     console.log(data2);
  //   }
}

fetchPokemon();
