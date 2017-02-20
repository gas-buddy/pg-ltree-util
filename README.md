pg-ltree-util
=============

Functions to escape and unescape utf-8 strings to value ltree values in postgresql.

Usage:

```
import * as ltree from 'pg-ltree-util';
console.log(ltree.escapeName('This is a test'));
// Prints This_20is_20a_20test
console.log(ltree.unescapeName('This_20is_20a_20test'));
// Prints This is a test
```