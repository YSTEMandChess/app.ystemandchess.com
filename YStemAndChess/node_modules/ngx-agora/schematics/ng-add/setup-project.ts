import { bold, red } from '@angular-devkit/core/src/terminal';
import { chain, Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import {
  addModuleImportToRootModule,
  getProjectFromWorkspace,
  getProjectMainFile,
  hasNgModuleImport
} from '@angular/cdk/schematics';
import { getSourceNodes, insertImport, isImported } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import { getWorkspace } from '@schematics/angular/utility/config';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { SourceFile } from 'typescript';

import { getProjectEnvironmentFile } from '../util/project-environment-file';
import { ts } from '../util/version-agnostic-typescript';
import { Schema } from './schema';

export default function(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return chain([addEnvironmentConfig(options), importEnvironmentIntoRootModule(options), addNgxAgoraModule(options)])(
      tree,
      context
    );
  };
}

function addEnvironmentConfig(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const workspace = getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace, options.project);
    const envPath = getProjectEnvironmentFile(project);

    // Verify environment.ts file exists
    if (!envPath) {
      return context.logger.warn(`❌ Could not find environment file: "${envPath}". Skipping ngx-agora configuration.`);
    }

    // ngx-agora config to add to environment.ts file
    const insertion = ',\n' + `  agora: {\n` + `    appId: '${options.appId}'\n` + `  }`;
    const sourceFile = readIntoSourceFile(tree, envPath);

    // Verify ngx-agora config does not already exist
    const sourceFileText = sourceFile.getText();
    if (sourceFileText.includes(insertion)) {
      return;
    }

    // Get the array of top-level Node objects in the AST from the SourceFile
    const nodes = getSourceNodes(sourceFile as any);
    const start = nodes.find(node => node.kind === ts.SyntaxKind.OpenBraceToken);
    let end;
    if (start) {
      end = nodes.find(node => node.kind === ts.SyntaxKind.CloseBraceToken, start.end);
    }

    const recorder = tree.beginUpdate(envPath);
    if (end) {
      recorder.insertLeft(end.pos, insertion);
    }
    tree.commitUpdate(recorder);

    context.logger.info('Configured the base evironment file with the provided API key.');
    return tree;
  };
}

function importEnvironmentIntoRootModule(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const IMPORT_IDENTIFIER = 'environment';
    const workspace = getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace, options.project);
    const appModulePath = getAppModulePath(tree, getProjectMainFile(project));
    const envPath = getProjectEnvironmentFile(project);
    const sourceFile = readIntoSourceFile(tree, appModulePath);

    if (isImported(sourceFile, IMPORT_IDENTIFIER, envPath)) {
      context.logger.info('Your environment file is already imported in app.module, skipping import...');
      return tree;
    }

    const change = insertImport(sourceFile, appModulePath, IMPORT_IDENTIFIER, envPath.replace(/\.ts$/, '')) as InsertChange;

    const recorder = tree.beginUpdate(appModulePath);
    recorder.insertLeft(change.pos, change.toAdd);
    tree.commitUpdate(recorder);

    context.logger.info('Imported environment into app.module.');
    return tree;
  };
}

function addNgxAgoraModule(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const MODULE_NAME = 'NgxAgoraModule.forRoot({ AppID: environment.agora.appId })';
    const workspace = getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace, options.project);
    const appModulePath = getAppModulePath(tree, getProjectMainFile(project));

    // Verify module has not already been imported
    if (hasNgModuleImport(tree, appModulePath, MODULE_NAME)) {
      return console.warn(red(`Could not import "${bold(MODULE_NAME)}" because "${bold(MODULE_NAME)}" is already imported.`));
    }

    // Add NgModule to root NgModule imports
    addModuleImportToRootModule(tree, MODULE_NAME, 'ngx-agora', project);

    context.logger.info('Imported the NgxAgoraModule, preconfigured, into app.module.');
    return tree;
  };
}

function readIntoSourceFile(host: Tree, fileName: string): SourceFile {
  const buffer = host.read(fileName);
  if (buffer === null) {
    throw new SchematicsException(`File ${fileName} does not exist.`);
  }

  return ts.createSourceFile(fileName, buffer.toString('utf-8'), ts.ScriptTarget.Latest, true);
}
