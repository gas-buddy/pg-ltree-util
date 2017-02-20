pg-ltree-util
=============

[![wercker status](https://app.wercker.com/status/466d4529e86acda146110f7bad19388e/s/master "wercker status")](https://app.wercker.com/project/byKey/466d4529e86acda146110f7bad19388e)
[![Coverage Status](https://coveralls.io/repos/github/gas-buddy/pg-ltree-util/badge.svg?branch=master)](https://coveralls.io/github/gas-buddy/pg-ltree-util?branch=master)

Functions to escape and unescape utf-8 strings to value ltree values in postgresql.

Usage:

```
import * as ltree from 'pg-ltree-util';
console.log(ltree.escapeName('This is a test'));
// Prints This_20is_20a_20test
console.log(ltree.unescapeName('This_20is_20a_20test'));
// Prints This is a test
```