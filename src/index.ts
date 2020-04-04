const testComponent = () => {
  const element = document.createElement('div');
  element.innerHTML = ('Typescript + Webpack!');

  return element;
};

document.body.appendChild(testComponent());