import { experimental } from '@angular-devkit/core';

export function getProjectTargetConfigurations(
  project: experimental.workspace.WorkspaceProject,
  buildTarget = 'build'
) {
  if (
    project.architect &&
    project.architect[buildTarget] &&
    project.architect[buildTarget].options
  ) {
    return project.architect[buildTarget].configurations;
  }

  throw new Error(
    `Cannot determine project target configurations for: ${buildTarget}.`
  );
}
