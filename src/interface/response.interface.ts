export interface ResponseInterface {
  code: string;
  message: string;
  data: Record<string, any>;
  set: (state: Partial<ResponseInterface>) => void;
  clear: () => void;
}
