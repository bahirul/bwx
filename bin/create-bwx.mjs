#!/usr/bin/env node

import process from "process";
import Path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import chalk from "chalk";
import { execSync } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));

const ignoreFiles = [
    'package-lock.json',
    'README.md',
    'LICENSE',
];

const ignoreDirs = [
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
        filter: (src) => {
            if (fs.lstatSync(src).isDirectory()) {
                return !ignoreDirs.includes(src);
            }

            return !ignoreFiles.includes(src);
        }
    });

    // copy .gitignore
    const gitignorePath = makePath(source, '.gitignore');
    if (fs.existsSync(gitignorePath)) {
        fs.copySync(gitignorePath, destination);
    } else {
        console.warn(chalk.yellow('.gitignore file does not exist in the source directory.'));
    }

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
