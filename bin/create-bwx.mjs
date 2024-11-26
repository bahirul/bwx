#!/usr/bin/env node

import chalk from "chalk";
import { execSync } from "child_process";
import fs from 'fs-extra';
import Path, { dirname } from 'path';
import process from "process";
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const ignoreLists = [
    'package-lock.json',
    'README.md',
    'LICENSE',
    '.git',
    'dist',
    'bin',
    'logs',
    'node_modules',
];

const excludePkgKeys = [
    'bin',
    'license',
];

const excludeDependencies = [
    'fs-extra',
    'chalk',
];

const excludeDevDependencies = [];

(async () => {
    const makePath = (...p) => Path.join(...p);

    const argv = process.argv.slice(2);

    if (argv.length < 1) {
        console.log('Please provide name for the new project.');
        process.exit(1);
    }

    const projectName = argv[0];
    const source = makePath(__dirname, '..');
    const destination = makePath(process.cwd(), projectName);

    // check if destination folder exists
    if (fs.existsSync(destination)) {
        console.info(`Folder`, chalk.green(destination), `already exists, please provide a different name.`);
        process.exit(1);
    }

    console.log(`Creating new project in`, chalk.green(destination));

    // copy files
    fs.copySync(source, destination, {
        filter: (f) => {
            const fx = Path.basename(f);
            return !ignoreLists.includes(fx);
        }
    });

    // create .gitignore
    const gitignoreNodeGithub = await fetch('https://raw.githubusercontent.com/github/gitignore/refs/heads/main/Node.gitignore');
    let gitignoreContent = '';

    if (gitignoreNodeGithub.ok) {
        gitignoreContent = await gitignoreNodeGithub.text();
    }

    const gitignorePath = makePath(destination, '.gitignore');
    await fs.writeFile(gitignorePath, `${gitignoreContent}\n# App configuration\n./src/config/main.ts\n`);

    // edit package.json
    const pkgPath = makePath(destination, 'package.json');
    const pkg = await fs.readJson(pkgPath);

    pkg.name = projectName;
    pkg.version = '1.0.0';
    pkg.description = '';
    pkg.author = '';

    // exclude keys
    excludePkgKeys.forEach(key => {
        delete pkg[key];
    });

    // exclude dependencies
    excludeDependencies.forEach(dep => {
        delete pkg.dependencies[dep];
    });

    // exclude devDependencies
    excludeDevDependencies.forEach(dep => {
        delete pkg.devDependencies[dep];
    });

    // write package.json
    await fs.writeJson(pkgPath, pkg, { spaces: 2 });

    console.log('');

    // install dependencies
    console.log(`Installing dependencies:`);
    Object.keys(pkg.dependencies).forEach(dep => {
        console.log('-', chalk.cyan(dep));
    });

    console.log('');

    // install devDependencies
    console.log(`Installing devDependencies:`);
    Object.keys(pkg.devDependencies).forEach(dep => {
        console.log('-', chalk.cyan(dep));
    });

    console.log('');

    // run npm install
    execSync('npm install', {
        cwd: destination,
        stdio: 'inherit',
    });

    console.log(chalk.green(`\nSuccess!`), `Created ${projectName} at ${destination}`);
})();
