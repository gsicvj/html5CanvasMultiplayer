import io from 'socket.io-client';
const socket = io('http://localhost:3000');

var myMessage: string = null;
socket.on('Users', (numberOfUsers: number) => {
  const app = document.getElementById(appId);
  app.innerHTML = `${numberOfUsers}`;
});

const renderApp = (containerId: string) => {
  const app = document.createElement('div');
  app.setAttribute('id', containerId);
  app.innerHTML = `Typescript + Webpack! WITH ${myMessage}`;

  document.body.appendChild(app);
};

const appId = 'multiplayer-app';
renderApp(appId);