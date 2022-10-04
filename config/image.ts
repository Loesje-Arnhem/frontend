export default {
  domains: ['localhost', 'https://i3.ytimg.com'],
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
