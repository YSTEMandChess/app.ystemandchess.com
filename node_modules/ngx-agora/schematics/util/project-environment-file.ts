import { experimental } from '@angular-devkit/core';
import { SchematicsException } from '@angular-devkit/schematics';
import { getProjectTargetConfigurations } from './project-configurations';

export function getProjectEnvironmentFile(
  project: experimental.workspace.WorkspaceProject
): string {
  const configurations = getProjectTargetConfigurations(project, 'build');

  if (
    !configurations.production ||
    !configurations.production.fileReplacements ||
    configurations.production.fileReplacements.length === 0
  ) {
    throw new SchematicsException(
      `Could not find the configuration of the workspace config (${project.sourceRoot})`
    );
  }

  const fileReplacements: [{ replace: string; with: string }] =
    configurations.production.fileReplacements;
  const fileReplacement = fileReplacements.find((replacement) =>
    /environment\.ts$/.test(replacement.replace)
  );

  if (fileReplacement === undefined) {
    throw new SchematicsException(
      `Could not find the environment file replacement configuration of the workspace config (${project.sourceRoot})`
    );
  }

  return fileReplacement.replace;
}
