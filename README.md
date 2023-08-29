# React useDeviceOrientation Hook

## Install

`npm i react-use-device-orientation`

## Usage

1. Import `useDeviceOrientation` hook.
2. Call `requestAccess` which prompts the use to grant permission on iOS.
3. Use the `orientation` data.

```js
import { useDeviceOrientation } from 'react-use-device-orientation'

// ...

const { orientation, requestAccess, revokeAccess, error } = useDeviceOrientation()
```

To obtain absolute orientation pass `"absolute"` to the hook as a parameter.

```js
const { orientation, requestAccess, revokeAccess, error } = useDeviceOrientation('absolute')
```

## More Info

https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent#browser_compatibility
