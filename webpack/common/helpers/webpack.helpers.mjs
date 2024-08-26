'use strict';

import path from "path";

const cwd = process.cwd();

export const inDev = () => {
    return process.env.NODE_ENV === "development";
};

export const createWebpackAliases = (aliases) => {
    const result = {};
    for (const name in aliases) {
        if (Object.prototype.hasOwnProperty.call(aliases, name)) {
            result[name] = path.join(cwd, aliases[name]);
        }
    }
    return result;
};
