import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  url,
  template,
  move,
  mergeWith,
  chain,
} from "@angular-devkit/schematics";
import { strings } from "@angular-devkit/core";
import * as ts from "typescript";

function createFolderStructure(_options: any): Rule {
  const templateSource = apply(url("./files"), [
    template({
      ..._options,
      ...strings,
    }),
    move("/src"),
  ]);

  return mergeWith(templateSource);
}

function addImportToModuleFile(tree: Tree, path: string) {
  const importText = `
  import { APP_INITIALIZER, inject} from '@angular/core';
  import { AppConfigService } from './shared/services';
  import { provideHttpClient } from '@angular/common/http';
`;
  const moduleArrayEntry = `provideHttpClient(),
   {    
      provide: APP_INITIALIZER,
      useFactory: () => {
        const appConfigService = inject(AppConfigService);
        return () => appConfigService.loadConfig();
      },
      deps: [AppConfigService],
      multi: true
    },`;

  if (!tree.exists(path)) {
    throw new Error(`File ${path} not found`);
  }

  const fileContent = tree.read(path);
  if (!fileContent) {
    throw new Error(`Could not read ${path}`);
  }

  const sourceFile = ts.createSourceFile(
    path,
    fileContent.toString(),
    ts.ScriptTarget.Latest,
    true
  );

  if (!sourceFile.getText().includes(importText)) {
    const recorder = tree.beginUpdate(path);

    // Add import statement at the top
    recorder.insertLeft(0, `${importText}\n`);

    // Locate the providers array and add the new module
    const providersArrayMatch = sourceFile
      .getText()
      .match(/providers:\s*\[([\s\S]*?)\]/);

    if (providersArrayMatch) {
      const importsPosition =
      providersArrayMatch.index! + providersArrayMatch[0].length - 1;
      recorder.insertLeft(importsPosition, `, ${moduleArrayEntry}`);
    }

    tree.commitUpdate(recorder);
  }
}

function editAppConfigFile(tree:Tree){
  const modulePath = "src/app/app.config.ts";
  addImportToModuleFile(tree, modulePath);
}

export function setupStructure(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // Create folder structure
    const folderStructureRule = createFolderStructure(_options);
    
    editAppConfigFile(tree)

    // Chain the folder structure creation rule
    return chain([folderStructureRule]);
  };
}
