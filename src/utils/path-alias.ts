/**
 * Resolve path alias to the actual path in the project
 */
import path from 'path';

function formatPath(pathStr: string): string {
    const paths = pathStr.split('/').filter((p) => p != '');
    return paths.join('/');
}

const aliases = {
    '@root': path.resolve(__dirname, '../../'),
    '@src': path.resolve(__dirname, '../../src'),
    '@logs': path.resolve(__dirname, '../../logs'),
};

export function getAlias(pathStr: string) {
    const pathFormatted = formatPath(pathStr);

    let matchAlias = false;

    for (const alias in aliases) {
        if (pathStr.startsWith(alias)) {
            const paths = pathStr.split('/');
            const aliasPath = paths[0];

            if (aliasPath === alias) {
                pathStr = pathFormatted.replace(
                    alias,
                    aliases[alias as keyof typeof aliases],
                );
                matchAlias = true;
                break;
            }
        }
    }

    return matchAlias ? pathStr : path.resolve(aliases['@src'], pathFormatted);
}
