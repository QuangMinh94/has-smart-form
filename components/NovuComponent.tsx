import {
    INovuProviderProps,
    IPopoverNotificationCenterProps,
    NovuProvider,
    PopoverNotificationCenter
} from "@novu/notification-center"
import NotiBell from "./NotiBell"

const NovuComponent = ({
    novuProps,
    popOverProps
}: {
    novuProps: Omit<INovuProviderProps, "children">
    popOverProps: Omit<IPopoverNotificationCenterProps, "children">
}) => {
    return (
        <NovuProvider {...novuProps}>
            <PopoverNotificationCenter
                //customize each item list
                /* listItem={(notification: any) => (
                    <div>{notification?.payload?.description}</div>
                )} */
                {...popOverProps}
            >
                {({ unseenCount }) => {
                    return <NotiBell unseenCount={unseenCount} />
                }}
            </PopoverNotificationCenter>
        </NovuProvider>
    )
}

export default NovuComponent
