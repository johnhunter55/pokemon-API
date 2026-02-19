async function fetchPokemon() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=200");
  const data = await res.json();

  let index = 0;
  let currentPokemonData = null;

  const updateUI = async () => {
    const pokemonRes = await fetch(data.results[index].url);
    currentPokemonData = await pokemonRes.json();

    const img = document.getElementById("pokemon-image");
    await new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve;
      img.src = currentPokemonData.sprites.front_default;
    });

    document.getElementById("pokemon-info").innerHTML =
      `<span id="pokemon-name" style="font-weight: bold; text-transform: capitalize; cursor: pointer;">Name: ${currentPokemonData.name}</span><br>Height: ${currentPokemonData.height}<br>Weight: ${currentPokemonData.weight}`;
  };

  await updateUI();

  const lB = document.getElementById("left");
  const rB = document.getElementById("right");
  const pokInfo = document.getElementById("pokemon-info");

  pokInfo.addEventListener("click", async () => {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${currentPokemonData.name}`,
    );
    const details = await res.json();

    pokInfo.innerHTML = `<span id="pokemon-name" style="font-weight: bold; text-transform: capitalize;">Name: ${details.name}</span><br>Height: ${details.height}<br>Weight: ${details.weight}<br>Base XP: ${details.base_experience}<br>Types: ${details.types
      .map((t) => t.type.name)
      .join(", ")}<br>Abilities: ${details.abilities
      .map((a) => a.ability.name)
      .join(", ")}<br>Stats: ${details.stats
      .map((s) => `${s.stat.name}: ${s.base_stat}`)
      .join(", ")}`;
  });

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
}

fetchPokemon();
