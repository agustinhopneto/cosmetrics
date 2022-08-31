import { ipcMain } from 'electron';
import { sayHello } from '../services/hello';
import { Routes } from '../router';

const hello = () => {
  ipcMain.handle(Routes.Hello, (_, message: string) => {
    return sayHello(message);
  });
};

export default hello;
