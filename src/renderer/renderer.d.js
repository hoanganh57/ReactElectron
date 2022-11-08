/* eslint-disable prettier/prettier */
declare global {
  interface Window {
    api: {
      sendMessage: (message: string) => void;
      createService: (url: string) => void;
    };
  }
}

export {};
