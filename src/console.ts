import { program } from 'commander';
import { helloWorld } from './command/hello';

program.name('console.ts').description('Console Command').version('1.0.0');

// register the command
program
    .command('hello/world')
    .description('Prints Hello World!')
    .action(helloWorld);

program.parse(process.argv);
