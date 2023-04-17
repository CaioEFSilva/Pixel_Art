const headerElement = document.querySelector('header');
const h1 = document.createElement('h1');
h1.innerHTML = 'Paleta de Cores';
h1.id = 'title';
h1.classList.add('cabecalho__tit');
headerElement.appendChild(h1);
// quadrados

const quadrado1 = document.getElementById('preto');
const quadrado2 = document.getElementById('color-1');
const quadrado3 = document.getElementById('color-2');
const quadrado4 = document.getElementById('color-3');
const colors = [quadrado1, quadrado2, quadrado3, quadrado4];

for (let index = 0; index < colors.length; index += 1) {
  const divColor = document.getElementsByClassName('color');

  if (index === 0) divColor[index].classList.add('selected');
}
// keys
const bkg = 'colorPalette';
const board = 'pixelBoard';
const boardSize = 'boardSize';

// local storage
const guardarBackgroundPaleta = () => {
  const backgrounds = {
    quadrado_1: quadrado1.style.backgroundColor,
    quadrado_2: quadrado2.style.backgroundColor,
    quadrado_3: quadrado3.style.backgroundColor,
    quadrado_4: quadrado4.style.backgroundColor,
  };

  localStorage.setItem(bkg, JSON.stringify(backgrounds));
};

const recuperarPaleta = () => {
  const dadosLocalStorage = JSON.parse(localStorage.getItem(bkg));
  quadrado2.style.backgroundColor = dadosLocalStorage.quadrado_2;
  quadrado3.style.backgroundColor = dadosLocalStorage.quadrado_3;
  quadrado4.style.backgroundColor = dadosLocalStorage.quadrado_4;
};

const saveBoard = () => {
  const pixels = document.querySelectorAll('.pixel');
  const memoryforPixels = [];

  pixels.forEach((pixelDiv) => {
    const color = pixelDiv.style.backgroundColor;
    if (!color) {
      memoryforPixels.push('white');
      return;
    }
    memoryforPixels.push(color);
  });
  localStorage.setItem(board, JSON.stringify(memoryforPixels));
};
const recuperarBoard = () => {
  const pixelsColors = JSON.parse(localStorage.getItem(board));
  if (!pixelsColors) return;

  return pixelsColors;
};

const saveBoardSize = (newSize) => {
  localStorage.setItem(boardSize, newSize);
};

const deleteSaveBoard = () => {
  localStorage.removeItem(board);
};

// criar pixels
const createPixels = (pixels, color) => {
  const boarde = document.querySelector('#pixel-board');
  let size = pixels;

  if (size < 5) size = 5;
  if (size > 50) size = 50;

  boarde.innerHTML = '';
  boarde.style.gridTemplateColumns = `repeat(${size}, auto)`;

  for (let index = 0; index < (size * size); index += 1) {
    const pixelDiv = document.createElement('div');
    pixelDiv.id = index;
    pixelDiv.classList.add('pixel');

    if (color) pixelDiv.style.backgroundColor = color[index];
    boarde.appendChild(pixelDiv);
  }
};

// mudar as cores
const gerarCores = () => {
  const hexadecimal = '0123456789ABCDEF';
  let cores = '#';

  for (let index = 0; index < 6; index += 1) {
    cores += hexadecimal[Math.floor(Math.random() * hexadecimal.length)];
  }
  return cores;
};
// selecionar
const selectColor = () => {
  const divOfColors = document.querySelectorAll('.color');

  divOfColors.forEach((divColor) => {
    divColor.addEventListener('click', (event) => {
      const selected = document.querySelector('.selected');

      if (selected.classList.contains('selected')) selected.classList.remove('selected');

      event.target.classList.add('selected');
    });
  });
};

// pintar
const paintPixel = () => {
  const pixels = document.querySelectorAll('.pixel');

  pixels.forEach((pixelDiv) => {
    pixelDiv.addEventListener('click', ({ target }) => {
      const pixel = target;
      const selected = document.querySelector('.selected');

      if (!selected) return;
      pixel.style.backgroundColor = selected.style.backgroundColor;
      saveBoard();
    });
  });
};

// clear
const clearBoard = () => {
  const clearBoardBtn = document.querySelector('#clear-board');

  clearBoardBtn.addEventListener('click', () => {
    const pixels = document.querySelectorAll('.pixel');

    pixels.forEach((pixelDiv) => {
      const pixel = pixelDiv;
      pixel.style.backgroundColor = 'white';
    });
    saveBoard();
  });
};

// tamanho
const recoveryBoardSize = () => {
  const boardSizez = JSON.parse(localStorage.getItem('boardSize'));
  if (!boardSizez) return 5;
  return boardSizez;
};

const changeSizeBoard = () => {
  const generateBoardBtn = document.querySelector('#generate-board');

  generateBoardBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const boardSizeInput = document.querySelector('#board-size');

    if (boardSizeInput.value === '') {
      alert('Board inválido!');
      return;
    }
    deleteSaveBoard();
    createPixels(parseInt(boardSizeInput.value, 10),);
    paintPixel();
    saveBoard();
    saveBoardSize(parseInt(boardSizeInput.value, 10));
  });
};
window.onload = () =>{
  quadrado1.style.backgroundColor = 'black';
  quadrado2.style.backgroundColor = 'red';
  quadrado3.style.backgroundColor = 'blue';
  quadrado4.style.backgroundColor = 'yellow';
  createPixels(recoveryBoardSize(), recuperarBoard());
  selectColor();
  paintPixel();
  clearBoard();
  changeSizeBoard();
  const btn = document.getElementById('button-random-color');
  btn.addEventListener('click', () => {
    quadrado2.style.backgroundColor = gerarCores();
    quadrado3.style.backgroundColor = gerarCores();
    quadrado4.style.backgroundColor = gerarCores();
    guardarBackgroundPaleta();
  });
  if (localStorage.getItem(bkg)) {
    recuperarPaleta();
  }
  if (localStorage.getItem(board)) recuperarBoard();
}
