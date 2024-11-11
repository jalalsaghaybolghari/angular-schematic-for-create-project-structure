export class ToastMessage {
  message: string;
  messageType: "success" | "error" | "info";
  timeOut: number | null;
  constructor() {
    this.message = "";
    this.messageType = "error";
    this.timeOut = null;
  }
}

export interface IAppConfig {
  env: {
    name: string;
  };
  apiServer: {
    useAbsoluteDomainUrl: boolean;
    url: string;
    port: string;
    suffix:string;
  };
}
