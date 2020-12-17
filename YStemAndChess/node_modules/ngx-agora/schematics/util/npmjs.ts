import { get } from 'http';

export interface NpmRegistryPackage {
  name: string;
  version: string;
}

export function getNPMPackage(npmPackage: NpmRegistryPackage): Promise<NpmRegistryPackage> {
  const DEFAULT_VERSION = npmPackage.version !== undefined ? npmPackage.version : '';

  return new Promise(resolve => {
    return get(`http://registry.npmjs.org/${npmPackage.name}/${DEFAULT_VERSION}`, res => {
      let rawData = '';
      res.on('data', chunk => (rawData += chunk));
      res.on('end', () => {
        try {
          const response = JSON.parse(rawData);
          const version = (response && response['dist-tags']) || {};

          resolve(buildPackage(response.name || npmPackage.name, version.latest));
        } catch (e) {
          resolve(buildPackage(npmPackage.name));
        }
      });
    }).on('error', () => resolve(buildPackage(npmPackage.name)));
  });

  function buildPackage(name: string, version: string = DEFAULT_VERSION): NpmRegistryPackage {
    return { name, version };
  }
}
