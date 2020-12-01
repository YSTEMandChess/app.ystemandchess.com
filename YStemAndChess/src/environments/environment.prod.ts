// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    agora: {
      appId: '6c368b93b82a4b3e9fb8e57da830f2a4',
    },
    urls: {
      middlewareURL: 'http://localhost/middleware',
      chessClientURL: 'http://localhost/chessclient/',
      stockFishURL : 'http://localhost/stockfishserver',
      chessServer : 'http://localhost/chessserver',
      originURL : 'http://localhost'
    }
  };
