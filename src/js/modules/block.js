export function Block(playerIndex) {
    if (!Number.isInteger(playerIndex) || playerIndex < 0) {
        throw new TypeError(`invalid player index: ${playerIndex}`);
    }
    this.id = playerIndex;
    this.coordinates = [];
}
