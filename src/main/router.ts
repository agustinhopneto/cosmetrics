import { readdirSync } from 'fs';
import { join } from 'path';

export const getApiRoutes = async () => {
  const files = readdirSync(join(__dirname, './routes')).filter(
    (file) => !file.endsWith('.map')
  );

  await Promise.all(
    files.map(async (file) => {
      const importedFile = await import(`./routes/${file}`);

      importedFile.default();
    })
  );
};

export namespace Routes {
  export const Hello = '/';
}