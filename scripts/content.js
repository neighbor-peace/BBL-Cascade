//Lobster class is pretty similar to the Head class from snake game
class Lobster {
  constructor() {
    const body = document.querySelector('body');
    this.node = document.createElement('img');
    this.node.setAttribute(
      'src',
      'https://clipart.world/wp-content/uploads/2021/06/Lobster-clipart-transparent-18.png'
    );

    this.node.classList.add('lobster');

    body.appendChild(this.node);

    this.horizontalDir = '';
    this.verticalDir = '';

    if (Math.random() > 0.5) {
      this.horizontalDir = 'right';
      this.node.classList.add('clockwise');
    } else {
      this.horizontalDir = 'left';
      this.node.classList.add('counter-clockwise');
    }
    if (Math.random() > 0.5) {
      this.verticalDir = 'up';
    } else {
      this.verticalDir = 'down';
    }
    this.node.style.top = `${Math.random() * 400 + 1}px`;
    this.node.style.left = `${Math.random() * 800 + 1}px`;
    this.refreshRate = 25;
    this.vertSpeed = Math.random() * 6;
    this.horSpeed = Math.random() * 6;

    setTimeout(this.move.bind(this), this.refreshRate);
  }
  move() {
    const lobster = this.node;
    let topPosition = Number(lobster.style.top.replace('px', ''));
    let leftPosition = Number(lobster.style.left.replace('px', ''));
    const windowHeight = window.innerHeight - 130;
    const windowWidth = window.innerWidth - 150;
    if (topPosition <= 0) {
      this.verticalDir = 'down';
    }
    if (topPosition >= windowHeight) {
      this.verticalDir = 'up';
    }

    if (leftPosition <= 0) {
      this.horizontalDir = 'right';
    }

    if (leftPosition >= windowWidth) {
      this.horizontalDir = 'left';
    }

    if (this.verticalDir === 'up') {
      lobster.style.top = `${topPosition - this.vertSpeed}px`;
    } else {
      lobster.style.top = `${topPosition + this.vertSpeed}px`;
    }

    if (this.horizontalDir === 'left') {
      lobster.style.left = `${leftPosition - this.horSpeed}px`;
    } else {
      lobster.style.left = `${leftPosition + this.horSpeed}px`;
    }

    setTimeout(this.move.bind(this), this.refreshRate);
  }
}

//Background color and image swapping
const body = document.querySelector('body');
body.style.background =
  'url(https://media.istockphoto.com/photos/dark-blue-ocean-surface-seen-from-underwater-picture-id1300845179?k=20&m=1300845179&s=612x612&w=0&h=KFrsespvjR2-xX7upGHj99CuTWCP4i5YCfAumN-HtS4=)';
body.style.backgroundSize = 'cover';
body.style.backgroundColor = '#005AA7';

//Make 5 lobsters, or go crazy and add more!
for (let i = 0; i <= 5; i++) {
  new Lobster();
}

//Traverse DOM to replace nouns
function textReplace(inputNode, replacementString) {
  //I learned regex in 20 minutes at https://www.youtube.com/watch?v=rhzKDrUiJVk
  //and you can too!
  const regexArr = [
    /(?<=\W(a)\s)\w+/gi,
    /(?<=\W(the)\s)\w+/gi,
    /(?<=\W(my)\s)\w+/gi,
    /(?<=\W(our)\s)\w+/gi,
    /(?<=\W(their)\s)\w+/gi,
    /(?<=\W(her)\s)\w+/gi,
    /(?<=\W(his)\s)\w+/gi,
    /(?<=\W(its)\s)\w+/gi,
    /(?<=\W(of)\s)\w+/gi,
    /(?<=\W(for)\s)\w+/gi,
  ];
  const treeWalker = document.createTreeWalker(inputNode, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (treeWalker.nextNode()) {
    textNodes.push(treeWalker.currentNode);
  }
  for (const node of textNodes) {
    regexArr.forEach(
      (regex) =>
        (node.nodeValue = node.nodeValue.replace(regex, replacementString))
    );
  }
}
//Invoke the textReplace function
textReplace(body, 'beautiful, bouncing lobster ');
