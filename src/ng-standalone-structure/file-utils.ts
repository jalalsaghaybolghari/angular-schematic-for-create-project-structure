import { apply, mergeWith, move, Rule, template, Tree, UpdateRecorder, url } from "@angular-devkit/schematics";
import { strings } from "@angular-devkit/core";

// Function to get a recorder for a file update
export function getFileRecorder(tree: Tree, path: string): UpdateRecorder {
  if (!tree.exists(path)) throw new Error(`File ${path} not found`);

  const fileContent = tree.read(path);
  if (!fileContent) throw new Error(`Could not read ${path}`);

  return tree.beginUpdate(path);
}

// Function to commit updates to a recorder
export function commitRecorder(tree: Tree, recorder: UpdateRecorder): void {
  tree.commitUpdate(recorder);
}

export function createFolderStructure(_options: any): Rule {
  const templateSource = apply(url("./files"), [
    template({
      ..._options,
      ...strings,
    }),
    move("/src"),
  ]);

  return mergeWith(templateSource);
}