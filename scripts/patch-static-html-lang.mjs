import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const outputRoot = path.join(process.cwd(), 'out');
const germanRoot = path.join(outputRoot, 'de');
const candidateFiles = [path.join(outputRoot, 'de.html')];

async function collectHtmlFiles(directory, files = []) {
  let entries;

  try {
    entries = await readdir(directory);
  } catch (error) {
    if (error?.code === 'ENOENT') {
      return files;
    }
    throw error;
  }

  for (const entry of entries) {
    const fullPath = path.join(directory, entry);
    const entryStat = await stat(fullPath);

    if (entryStat.isDirectory()) {
      await collectHtmlFiles(fullPath, files);
    } else if (entry.endsWith('.html')) {
      files.push(fullPath);
    }
  }

  return files;
}

async function patchFile(filePath) {
  let html;

  try {
    html = await readFile(filePath, 'utf8');
  } catch (error) {
    if (error?.code === 'ENOENT') {
      return false;
    }
    throw error;
  }

  const patched = html.replace(/<html lang="en"/, '<html lang="de"');

  if (patched === html) {
    return false;
  }

  await writeFile(filePath, patched);
  return true;
}

const files = [...candidateFiles, ...(await collectHtmlFiles(germanRoot))];
let patchedCount = 0;

for (const file of files) {
  if (await patchFile(file)) {
    patchedCount += 1;
  }
}

console.log(`Patched ${patchedCount} German static HTML file(s) with lang="de".`);
