export function safeLog(message?: any, ...optionalParams: any[]) {
  return process.env.NODE_ENV !== 'production' ? console.log(message, ...optionalParams) : void 0;
}
