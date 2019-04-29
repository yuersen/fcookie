# fcookie

A simple, lightweight JavaScript API for handling cookies.

- Works in IE8+ (Because the JSON method is used.)
- Accepts any character
- Heavily tested
- No dependency
- Supports CommonJS/ES Module/UMD

## Installation

### Direct download

Download the script from `dist/fcookie.umd.js` and include it.

```html
<script src="/path/to/fcookie.umd.js"></script>
```

### Package Managers

```
npm install fcookie --save
```

## Basic Usage

### UMD

```javascript
// set item
fcookie.setItem('name', 'fcookie');

// get item
fcookie.getItem('name');

// remove item
fcookie.removeItem('name');

// check item
fcookie.hasItem('name');

// clear
fcookie.clear();
```

### CJS / ES

```javascript
import { setItem, getItem, removeItem, hasItem, clear } from 'fcookie';

// set item
setItem('name', 'fcookie');

// get item
getItem('name');

// remove item
removeItem('name');

// check item
hasItem('name');

// clear
clear();
```

## API

| Method     | Parameter                                     | Describe                        |
| ---------- | --------------------------------------------- | ------------------------------- |
| setItem    | (key: string, value: any, end?: string/number/Date, path?: string, domain?: string, secure?: boolean) | Add key to the cookie, or update that key's value if it already exists. |
| getItem    | (key: string)                                 | Return that key's value.        |
| removeItem | (key: string, path?: string, domain?: string) | Remove the key from the cookie. |
| hasItem    | (key?: string)                                | Check the key is exist.         |
| clear      | ()                                            | Clear all key from the cookie.  |
| keys       | ()                                            | Return all key from cookie.     |
