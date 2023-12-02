import EmptyState from "@/components/emptyState"
import ClientOnly from "@/components/clientOnly"
import getCurrentUser from "@/actions/getCurrentUser"
import getReservations from "@/actions/getReservations"
import ReservationsClient from "@/components/reservations/reservationsClient"

const ReservationPage = async () => {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subTitle="Please login" />
            </ClientOnly>
        )
    }


    const reservations = await getReservations({
        authorId: currentUser.id
    })

    if (reservations.length == 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No reservations found"
                    subTitle="Looks like you have no reservation on your properties" />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <ReservationsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )

}

export default ReservationPage;