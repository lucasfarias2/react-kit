import type { ViteDevServer } from 'vite';

declare global {
  namespace Express {
    interface Request {
      asd: string;
      device?: IDevice;
    }

    interface Response {
      renderView: (pageName: string, props?: unknown) => void;
      isProd?: boolean;
      locals: {
        vite: ViteDevServer;
      };
    }
  }

  export interface IDevice {
    type: TDeviceType;
  }

  type TDeviceType = 'mobile' | 'desktop';

  export type IWindow = typeof window & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __PRELOADED_STATE__: any;
  };

  export interface IComponent {
    children?: React.ReactNode;
    className?: string;
    device?: IDevice;
  }

  export type TOnClick = React.MouseEvent<HTMLButtonElement>;
  export type TOnChangeInputEvent = React.ChangeEvent<HTMLInputElement>;
  export type TOnChangeSelectEvent = React.ChangeEvent<HTMLSelectElement>;
  export type TOnChangeTextAreaEvent = React.ChangeEvent<HTMLTextAreaElement>;
}
