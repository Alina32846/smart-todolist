// Babel нужен только для Jest, чтобы он понимал JSX и современный синтаксис.
// Vite в разработке/сборке использует собственный трансформер и Babel не задействует.
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};
