/** @type { import('@storybook/react').Preview } */
import '../src/css/main.scss'
import '../src/css/google-fonts.scss'

const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;
