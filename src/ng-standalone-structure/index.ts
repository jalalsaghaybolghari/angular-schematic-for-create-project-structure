// import {
//   Rule,
//   SchematicContext,
//   Tree,
//   apply,
//   url,
//   template,
//   move,
//   mergeWith,
//   chain,
//   UpdateRecorder,
// } from "@angular-devkit/schematics";
// import { strings } from "@angular-devkit/core";
// import * as ts from "typescript";

// function createFolderStructure(_options: any): Rule {
//   const templateSource = apply(url("./files"), [
//     template({
//       ..._options,
//       ...strings,
//     }),
//     move("/src"),
//   ]);

//   return mergeWith(templateSource);
// }

// function getFileRecorder(tree: Tree, path: string): UpdateRecorder {
//   if (!tree.exists(path)) {
//     throw new Error(`File ${path} not found`);
//   }

//   const fileContent = tree.read(path);
//   if (!fileContent) {
//     throw new Error(`Could not read ${path}`);
//   }
//   return tree.beginUpdate(path);
// }

// function commitFileRecorder(tree: Tree, recorder: UpdateRecorder): void {
//   tree.commitUpdate(recorder);
// }

// function addStatementsToMetaData(
//   path: string,
//   tree: Tree,
//   recorder: UpdateRecorder,
//   moduleArrayEntry: string,
//   metaData: string
// ) {
//   const fileContent = tree.read(path) as Buffer;

//   const sourceFile = ts.createSourceFile(
//     path,
//     fileContent.toString(),
//     ts.ScriptTarget.Latest,
//     true
//   );
//   const moduleArrayMatch = sourceFile
//     .getText()
//     .match(new RegExp(`${metaData}:\\s*\\[([\\s\\S]*?)\\]`));

//   if (moduleArrayMatch) {
//     const importsPosition =
//       moduleArrayMatch.index! + moduleArrayMatch[0].length - 1;
//     recorder.insertLeft(importsPosition, `, ${moduleArrayEntry}`);
//   }
// }

// function addStatementsToTopOfFile(recorder: UpdateRecorder, statement: string) {
//   recorder.insertLeft(0, `${statement}\n`);
// }

// export function setupStructure(_options: any): Rule {
//   return (tree: Tree, _context: SchematicContext) => {
//     // Create folder structure
//     const folderStructureRule = createFolderStructure(_options);

//     // ---------------------------------------------------------
//     const path = "src/app/app.config.ts";
//     const recorder = getFileRecorder(tree, path);

//     const importText = `
//       import { APP_INITIALIZER, inject} from '@angular/core';
//       import { AppConfigService } from './shared/services';
//       import { provideHttpClient } from '@angular/common/http';
//     `;
//     addStatementsToTopOfFile(recorder, importText);

//     const metaDataEntry = `
//     provideHttpClient(),
//     {    
//        provide: APP_INITIALIZER,
//        useFactory: () => {
//          const appConfigService = inject(AppConfigService);
//          return () => appConfigService.loadConfig();
//        },
//        deps: [AppConfigService],
//        multi: true
//     },
//     `;
//     const metaDataName = "providers";
//     addStatementsToMetaData(
//       path,
//       tree,
//       recorder,
//       metaDataEntry,
//       metaDataName
//     );
//     commitFileRecorder(tree, recorder);
//     //----------------------------------------------------------

//     // Chain the folder structure creation rule
//     return chain([folderStructureRule]);
//   };
// }



import { Rule, SchematicContext, Tree, chain } from "@angular-devkit/schematics";
import { createFolderStructure } from "./file-utils";
import { addImports, addMetadataEntry } from "./metadata-utils";
import * as path from "path";
import * as fs from "fs";

const CONFIG_PATH = path.join(__dirname, './data/config-data.json');

function loadConfigData(): ConfigData {
  const configFile = fs.readFileSync(CONFIG_PATH, 'utf-8');
  return JSON.parse(configFile);
}

export function setupStructure(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const configData = loadConfigData();
    const appConfigData = configData.updateAppConfigByConfigService;

    const folderStructureRule = createFolderStructure(_options);

    addImports(tree, appConfigData.path, appConfigData.importStatements.join('\n'));
    addMetadataEntry(tree, appConfigData.path, "providers", appConfigData.providersMetaData.join(',\n'));

    return chain([folderStructureRule]);
  };
}