import React, { createContext, useCallback, useContext } from 'react';
import { showNotification } from '@mantine/notifications';
import {
  RiAlertFill,
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiInformationFill,
} from 'react-icons/ri';

type NotifyParams = {
  message: string;
  type: 'info' | 'success' | 'warn' | 'danger';
};

type NotificationsProps = {
  notify: (params: NotifyParams) => void;
};

type NotificationsProviderProps = {
  children: React.ReactNode;
};

const notifyStyles = {
  info: {
    title: 'Importante!',
    color: 'blue',
    icon: <RiInformationFill />,
  },
  success: {
    title: 'Sucesso!',
    color: 'green',
    icon: <RiCheckboxCircleFill />,
  },
  warn: {
    title: 'Atenção!',
    color: 'yellow',
    icon: <RiAlertFill />,
  },
  danger: {
    title: 'Erro!',
    color: 'red',
    icon: <RiCloseCircleFill />,
  },
};

const NotificationsContext = createContext<NotificationsProps>(
  {} as NotificationsProps
);

export function NotificationsProvider({
  children,
}: NotificationsProviderProps) {
  const notify = useCallback(({ message, type }: NotifyParams) => {
    const { title, color, icon } = notifyStyles[type];

    showNotification({
      title,
      message,
      color,
      icon,
      autoClose: 5000,
    });
  }, []);

  return (
    <NotificationsContext.Provider value={{ notify }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export const useNotifications = (): NotificationsProps => {
  return useContext(NotificationsContext);
};
