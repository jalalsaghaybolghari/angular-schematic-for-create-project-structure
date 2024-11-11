import * as ts from "typescript";
import { Tree } from "@angular-devkit/schematics";
import { commitRecorder, getFileRecorder } from "./file-utils";

// Function to add metadata entries to specified arrays in a config file
export function addMetadataEntry(
  tree: Tree,
  path: string,
  metadataName: string,
  entry: string
) {
  const recorder = getFileRecorder(tree, path);
  const fileContent = tree.read(path) as Buffer;

  const sourceFile = ts.createSourceFile(
    path,
    fileContent.toString(),
    ts.ScriptTarget.Latest,
    true
  );

  const metadataRegex = new RegExp(`${metadataName}:\\s*\\[([\\s\\S]*?)\\]`);
  const metadataMatch = sourceFile.getText().match(metadataRegex);

  if (metadataMatch) {
    const position = metadataMatch.index! + metadataMatch[0].length - 1;
    recorder.insertLeft(position, `, ${entry}`);
  }

  commitRecorder(tree, recorder);
}

export function addImports(tree: Tree, path: string, imports: string): void {
    const recorder = getFileRecorder(tree, path);
    
    // Insert imports at the top of the file
    recorder.insertLeft(0, `${imports}\n`);
    
    // Commit the changes
    commitRecorder(tree, recorder);
  }