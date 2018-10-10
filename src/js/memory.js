import getMixedNumberArray from './helpers';

// TODO: Spelaren ska kunna se hur många par den har.
// TODO: Spelar ska kunna se under hur många sekunder som han har spelat.
// TODO: När ett par hittas så ska brickorna försvinna.
// TODO: Det ska enkelt gå att ladda in flera spel, genom att anropa en funktion flera gånger.
// TODO: När spelet är slut ska sekunder sluta räknas
// TODO: En enklare dokumentation i README.md som ska vara skriven i markup språket Markdown. Bör innehålla kortare information om vad som ligger i respektive fil samt vilka kommandon som ska köras för att starta utvecklingsserver samt hur man bygger en build.
const timer = score => {
  const timeEl = document.getElementById('time');
  return window.setInterval(() => {
    const currentTime = Date.now();
    score.time = Math.round((currentTime - score.startTime) / 1000);
    timeEl.textContent = score.time;
  }, 1000);
};

const turnBrick = (bricks, img, score, renderOptions, t) => {
  const triesEl = document.getElementById('tries');
  const pairsEl = document.getElementById('pairs');

  if (bricks.second !== null) {
    return;
  }

  if (bricks.first === null) {
    bricks.first = img;
  } else {
    bricks.second = img;
  }
  const isSameSrc = bricks.first.getAttribute('src') === bricks.second.getAttribute('src');
  const isDifferentBrick =
    bricks.first.getAttribute('data-index-number') !==
    bricks.second.getAttribute('data-index-number');
  const isPair = isSameSrc && isDifferentBrick;
  if (isPair) {
    // FIXME

    window.setTimeout(() => {
      bricks.first.parentElement.classList.add('hidden');
      bricks.second.parentElement.classList.add('hidden');
      score.pairs++;
      score.tries++;
      pairsEl.textContent = score.pairs;
      triesEl.textContent = score.tries;

      bricks.first = null;
      bricks.second = null;
      if ((renderOptions.rows * renderOptions.columns) / 2 === score.pairs) {
        const msgEl = document.getElementById('win-message');
        clearInterval(t);
        msgEl.textContent = `Grattis! du vann efter ${score.tries} försök och fick ${
          score.pairs
        } par på ${score.time} sekunder`;
      }
    }, 300);
  } else {
    // FIXME
    window.setTimeout(() => {
      const path = 'images/0.png';

      bricks.first.setAttribute('src', path);
      bricks.second.setAttribute('src', path);
      score.tries++;
      triesEl.textContent = score.tries;

      bricks.first = null;
      bricks.second = null;
    }, 300);
  }
};

const renderMemory = (containerId, bricks, score, renderOptions) => {
  const container = document.getElementById(containerId);

  const template = document.querySelector('#memory template');
  const templateDiv = template.content.querySelector('.memory');
  const headerDiv = template.content.getElementById('header');

  const div = document.importNode(templateDiv, false);
  const header = document.importNode(headerDiv, true);

  div.appendChild(header);
  container.appendChild(div);
  const t = timer(score);

  div.addEventListener('click', event => {
    const isTargetBrick = event.target.getAttribute('class') === 'brick';
    const isParentBrick = event.target.parentElement.getAttribute('class') === 'brick';
    const isBrick = isTargetBrick || isParentBrick;
    if (!isBrick) {
      return;
    }
    const img = event.target.tagName === 'DIV' ? event.target.firstElementChild : event.target;

    const tileIndex = event.target.getAttribute('data-index-number')
      ? event.target.getAttribute('data-index-number')
      : event.target.firstElementChild.getAttribute('data-index-number');

    const path = `images/${bricks.tiles[tileIndex]} png`;
    img.setAttribute('src', path);

    turnBrick(bricks, img, score, renderOptions, t);
  });

  bricks.tiles.forEach((tiles, i) => {
    const brick = document.importNode(templateDiv.firstElementChild, true);

    brick.addEventListener('click', event => {
      const img = event.target.tagname === 'DIV' ? event.target.firstElementChild : event.target;

      const path = `images/${bricks.tiles[i]}.png`;
      img.setAttribute('src', path);

      turnBrick(bricks, img, score, renderOptions, t);
    });
    brick.firstElementChild.setAttribute('data-index-number', i);
    div.appendChild(brick);
  });
};

const memory = containerId => {
  const renderOptions = {
    rows: 4,
    columns: 4
  };

  const bricks = {
    first: null,
    second: null,
    tiles: getMixedNumberArray((renderOptions.rows * renderOptions.columns) / 2)
  };

  const score = {
    tries: 0,
    pairs: 0,
    time: 0,
    startTime: Date.now()
  };

  renderMemory(containerId, bricks, score, renderOptions);
};

export default memory;
