# React useDeviceOrientation Hook

# Install

`npm i react-use-device-orientation`

# Usage

```js
import { useDeviceOrientation } from 'react-use-device-orientation'

// ...

const { orientation, requestAccess, revokeAccess, error } = useDeviceOrientation()
```

To obtain absolute orientation pass `"absolute"` to the hook as a parameter.

```js
const { orientation, requestAccess, revokeAccess, error } = useDeviceOrientation('absolute')
```
