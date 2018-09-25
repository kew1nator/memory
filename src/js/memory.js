// TODO: Spelaren ska kunna se hur många par den har.
// TODO: Spelar ska kunna se under hur många sekunder som han har spelat.
// TODO: När ett par hittas så ska brickorna försvinna.
// TODO: Det ska enkelt gå att ladda in flera spel, genom att anropa en funktion flera gånger.
// TODO: När spelet är slut ska sekunder sluta räknas
// TODO: En enklare dokumentation i README.md som ska vara skriven i markup språket Markdown. Bör innehålla kortare information om vad som ligger i respektive fil samt vilka kommandon som ska köras för att starta utvecklingsserver samt hur man bygger en build.
const memory = () => {
  const rows = 4;
  const columns = 4;

  const tiles = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  const containerId = 'memory';

  const container = document.getElementById(containerId);
  const template = document.querySelector('#memory template');
  // FIXME:

  const templateDiv = template.content.firstElementChild;

  const div = document.importNode(templateDiv, false);

  container.appendChild(div);
  // FIXME:
  for (let i = 0; i < tiles.length; i++) {
    // FIXME:

    const handleClick = event => {
      // FIXME:
      let img;
      if (event.target.tagName === 'DIV') {
        img = event.target.firstElementChild;
      } else {
        img = event.target;
      }
      const path = `images/${tiles[i]}.png`;
      img.setAttribute('src', path);
    };

    const brick = document.importNode(templateDiv.firstElementChild, true);
    // FIXME:
    brick.addEventListener('click', handleClick);
    div.appendChild(brick);
  }
};

export default memory;
