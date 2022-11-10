/* eslint-disable prettier/prettier */
declare global {
  interface Window {
    api: {
      addService: (key: string) => void;
      visibleService: (isShowView: boolean) => void;
    };
  }
}

export {};
