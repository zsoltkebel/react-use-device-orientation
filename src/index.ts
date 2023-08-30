import { useCallback, useEffect, useState } from 'react'

interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
    requestPermission?: () => Promise<'granted' | 'denied'>
}

type DeviceOrientation = {
    absolute: boolean | null
    alpha: number | null
    beta: number | null
    gamma: number | null
    webkitCompassHeading: number | null
    webkitCompassAccuracy: number | null
}

type UseDeviceOrientationData = {
    orientation: DeviceOrientation | null
    error: Error | null
    requestAccess: () => Promise<boolean>
    revokeAccess: () => Promise<void>
}

export const useDeviceOrientation = (
    mode: 'relative' | 'absolute' = 'relative'
): UseDeviceOrientationData => {
    const [error, setError] = useState<Error | null>(null)
    const [orientation, setOrientation] = useState<DeviceOrientation | null>(null)

    const onDeviceOrientation = (event: any): void => {
        setOrientation({
            absolute: event.absolute,
            alpha: event.alpha,
            beta: event.beta,
            gamma: event.gamma,
            webkitCompassHeading: event.webkitCompassHeading,
            webkitCompassAccuracy: event.webkitCompassAccuracy,
        })
    }

    const revokeAccessAsync = async (): Promise<void> => {
        window.removeEventListener('deviceorientationabsolute', onDeviceOrientation)
        window.removeEventListener('deviceorientation', onDeviceOrientation)
        setOrientation(null)
    }

    const requestAccessAsync = async (): Promise<boolean> => {
        if (typeof DeviceOrientationEvent !== 'function') {
            setError(new Error('Device orientation event is not supported by your browser'))
            return false
        }

        if (
            (DeviceOrientationEvent as unknown as DeviceOrientationEventiOS).requestPermission &&
            typeof (DeviceOrientationEvent as unknown as DeviceOrientationEventiOS)
                .requestPermission === 'function'
        ) {
            let permission: PermissionState
            try {
                permission = await (
                    DeviceOrientationEvent as unknown as DeviceOrientationEventiOS
                ).requestPermission()
            } catch (err) {
                setError(err)
                return false
            }
            if (permission !== 'granted') {
                setError(new Error('Request to access the device orientation was rejected'))
                return false
            }
        }

        if (mode === 'absolute' && 'ondeviceorientationabsolute' in window) {
            window.addEventListener('deviceorientationabsolute', onDeviceOrientation)
        } else {
            //! Firefox and Safari does not support "deviceorientationabsolute" event
            window.addEventListener('deviceorientation', onDeviceOrientation)
        }

        return true
    }

    const requestAccess = useCallback(requestAccessAsync, [])
    const revokeAccess = useCallback(revokeAccessAsync, [])

    useEffect(() => {
        return (): void => {
            revokeAccess()
        }
    }, [revokeAccess])

    return {
        orientation,
        error,
        requestAccess,
        revokeAccess,
    }
}
