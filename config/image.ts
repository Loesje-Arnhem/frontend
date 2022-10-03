export default {
  domains: ['localhost', 'https://www.loesje.nl'],
  presets: {
    base: {
      modifiers: {
        format: 'avif',
        quality: 80,
        fit: 'inside',
      },
    },
  },
}
