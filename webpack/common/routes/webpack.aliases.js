'use strict';

import { createWebpackAliases } from '../helpers/webpack.helpers.mjs';

export default createWebpackAliases({
    '@src': 'src',
    '@assets': 'assets',
});
