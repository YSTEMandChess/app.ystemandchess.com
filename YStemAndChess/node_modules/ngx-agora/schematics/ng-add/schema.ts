export interface Schema {
  /** Name of the project. */
  project: string;

  /** Agora application ID. */
  appId: string;

  /** Version of the Agora SDK to be used. */
  version:
    | 'latest'
    | '3.0.2'
    | '3.0.1'
    | '3.0.0'
    | '2.9.0'
    | '2.8.0'
    | '2.7.1'
    | '2.6.1';
}
