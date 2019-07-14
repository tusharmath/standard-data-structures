# standard-data-structures

[![Build Status](https://travis-ci.com/tusharmath/standard-data-structures.svg?branch=master)](https://travis-ci.com/tusharmath/standard-data-structures)
![npm](https://img.shields.io/npm/v/standard-data-structures.svg)

A collection of standard data-structures for node and browser

# Index

- [Installation](#installation)
- [Usage](#usage)
- [Documentation](https://tusharmath.com/standard-data-structures)

# Installation

**npm:**

```bash
npm i standard-data-structures --save
```

**yarn:**

```bash
yarn add standard-data-structures
```

# Usage

```ts
import {immutable} from 'standard-data-structures'

const list = immutable.List.of(10) // creates a singly linked list

list.forEach(console.log) // runs the specified function on each item of the list
```
