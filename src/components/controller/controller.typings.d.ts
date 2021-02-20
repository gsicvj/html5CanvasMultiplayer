interface ControllerKeyMap {
    [key: number]: string;
}

interface ControllerKeyState {
    state: boolean;
    directionFactor: number;
    axis: 'x' | 'y';
}

interface ControllerKeys {
    [key: string]: ControllerKeyState;
}
