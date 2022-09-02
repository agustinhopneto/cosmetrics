import { Global } from '@mantine/core';

export function GlobalStyles() {
  return (
    <Global
      styles={(theme) => ({
        /* width */
        '::-webkit-scrollbar': {
          width: 10,
        },

        /* Track */
        '::-webkit-scrollbar-track': {
          background: 'transparent',
        },

        /* Handle */
        '::-webkit-scrollbar-thumb': {
          background: theme.colors.pink[7],
          borderRadius: 5,
        },

        /* Handle on hover */
        '::-webkit-scrollbar-thumb:hover': {
          background: theme.colors.pink[9],
        },
      })}
    />
  );
}
