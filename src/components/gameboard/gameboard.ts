import Painter from '../../utilities/painter/painter';

class GameBoard {

    readonly GAME_BOARD_ID = 'jabba-the-hutt';
    readonly CLEAR_COLOR = '#fee';
    readonly OTHER_PLAYERS_FILL_COLOR = '#555';
    readonly OTHER_PLAYERS_STROKE_COLOR = '#000';
    readonly OTHER_PLAYERS_SIZE = 50;

    board: HTMLCanvasElement = null;
    size: Dimensions = null;
    position: Coordinate = null;

    context: CanvasRenderingContext2D = null;
    painter: Painter = null;

    serverPlayers: ServerPlayer[] = null;
    playerId: ServerPlayer['id'] = null;

    constructor(size: Dimensions) {
        this.size = size;
        this.board = this.html();
        this.context = this.board.getContext('2d');

        // Skip setting listeners, variables when browser's a monolith ...
        if (!this.context) return;

        this.painter = new Painter(this.context);

        // add event listeners
        window
            .addEventListener(
                'resize',
                this.handleResizeEvents.bind(this)
            );

        this.positionSelf();
    }

    html(): HTMLCanvasElement {
        const canvas = document.createElement('canvas');
        canvas.setAttribute('id', this.GAME_BOARD_ID);
        canvas.setAttribute('width', `${this.size.width}px`);
        canvas.setAttribute('height', `${this.size.height}px`);

        return canvas;
    }

    positionSelf() {
        const {
            top,
            left
        } = this
            .board
            .getBoundingClientRect();

        this.position = {
            x: left,
            y: top
        };
    }

    data(): GameBoardData {
        return {
            painter: this.painter,
            offset: {
                x: this.position.x,
                y: this.position.y
            }
        };
    }

    handleResizeEvents() {
        this.positionSelf();
    };

    update(playerId: string, serverPlayers: ServerPlayer[]) {
        this.playerId = playerId;
        this.serverPlayers = serverPlayers;
    };

    draw() {
        this
            .painter
            .drawRect(
                this.position.x,
                this.position.y,
                this.size.width,
                this.size.height,
                this.CLEAR_COLOR
            );

        if (!this.serverPlayers) return;
        for (const player of this.serverPlayers) {
            if (player.id !== this.playerId) {
                this
                    .painter
                    .drawRect(
                        player.position.x,
                        player.position.y,
                        this.OTHER_PLAYERS_SIZE,
                        this.OTHER_PLAYERS_SIZE,
                        this.OTHER_PLAYERS_FILL_COLOR,
                        this.OTHER_PLAYERS_STROKE_COLOR
                    );
            }
        }
    }
}

export {
    GameBoard as default
};
