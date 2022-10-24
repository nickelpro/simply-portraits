export function registerSettings() {
  game.settings.register('simply-portraits', 'size', {
    name: 'Portrait Size (px)',
    hint: 'The width and height of chat portraits in the chat log, given in pixels',
    scope: 'client',
    type: Number,
    default: 36,
    config: true,
    requiresReload: true
  });
}
