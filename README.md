# collections-ts

[![Build Status](https://travis-ci.com/tusharmath/collections-ts.svg?branch=master)](https://travis-ci.com/tusharmath/collections-ts)
![npm](https://img.shields.io/npm/v/collections-ts.svg)

A collection of standard data-structures for node and browser

# Index

- [Installation](#installation)
- [Usage](#usage)
- [Documentation](https://tusharmath.com/collections-ts)

# Installation

**npm:**

```bash
npm i collections-ts --save
```

**yarn:**

```bash
yarn add collections-ts
```

# Usage

```ts
import * as DS from 'collections-ts'

const list = DS.List.of(10) // creates a singly linked list

list.forEach(console.log) // runs the specified function on each item of the list
```
