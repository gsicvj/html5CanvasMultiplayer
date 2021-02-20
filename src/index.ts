import io from 'socket.io-client';
import
{
    start as GamePlayStart,
    stop as GamePlayStop
}
    from './scenes/gameplay/gameplay';

const socket = io('http://localhost:3000');
const appId = 'multiplayer-app';

const renderApp = (containerId: string) => {
    const app = document.createElement('div');
    app.setAttribute('id', containerId);

    const startButton = document.createElement('button');
    startButton.innerHTML = 'Start';
    startButton.setAttribute('type', 'button');
    startButton.addEventListener('click', () => GamePlayStart(appId, socket));

    const stopButton = document.createElement('button');
    stopButton.innerHTML = 'Stop';
    stopButton.setAttribute('type', 'button');
    stopButton.addEventListener('click', () => GamePlayStop());

    document.body.append(app, startButton, stopButton);
};

renderApp(appId);
