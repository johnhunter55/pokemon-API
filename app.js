async function fetchPokemon() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?");
  const data = await res.json();

  let index = 0;

  const updateUI = async () => {
    const pokemonRes = await fetch(data.results[index].url);
    const pokemonData = await pokemonRes.json();
    document.getElementById("pokemon-image").src =
      pokemonData.sprites.front_default;

    document.getElementById("pokemon-info").innerText =
      `Name: ${pokemonData.name}\nHeight: ${pokemonData.height}\nWeight: ${pokemonData.weight}`;
  };

  await updateUI();

  const lB = document.getElementById("left");
  const rB = document.getElementById("right");

  lB.addEventListener("click", async () => {
    if (index > 0) {
      index -= 1;
      await updateUI();
    } else {
      index = data.results.length - 1;
      await updateUI();
    }
  });

  rB.addEventListener("click", async () => {
    if (index < data.results.length - 1) {
      index += 1;
      await updateUI();
    } else {
      index = 0;
      await updateUI();
    }
  });

  //   for (let i = 0; i < data.results.length; i++) {
  //     const re2 = await fetch(data.results[i].url);
  //     const data2 = await re2.json();
  //     console.log(data2);
  //   }
}

fetchPokemon();
