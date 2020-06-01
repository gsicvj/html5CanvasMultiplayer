interface ControllerKeyMap {
  [key: number]: string;
}

interface ControllerKeyState {
  state: boolean;
  directionFactor: number;
  axis: string;
}

interface ControllerKeys {
  [key: string]: ControllerKeyState;
}