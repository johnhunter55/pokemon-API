const pokeBtn = document.getElementById("fetch-btn");

pokeBtn.addEventListener("click", async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?");

  const data = await res.json();

  for (let i = 0; i < data.results.length; i++) {
    const re2 = await fetch(data.results[i].url);
    const data2 = await re2.json();
    console.log(data2);

    const listContainer = document.querySelector(".modal-list");
    const listItem = document.createElement("li");

    listItem.innerText = data2.name;
    listItem.innerHTML += `<img src="${data2.sprites.front_default}" alt="${data2.name}">`;
    listContainer.appendChild(listItem);
  }
});
