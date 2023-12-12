import EmptyState from "@/components/emptyState"
import ClientOnly from "@/components/clientOnly"

import getCurrentUser from "@/actions/getCurrentUser"
import getFavoriteListing from "@/actions/getFavoritesListings"
import FavoritesClient from "@/components/favorites/favoritesClient"

const FavoritesPage = async () => {
    const currentUser = await getCurrentUser();
    const listings = await getFavoriteListing();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subTitle="Please login" />
            </ClientOnly>
        )
    }

    if (listings.length == 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No Favorites found"
                    subTitle="Looks like you have no Favorites listings" />
            </ClientOnly>
        )
    }


    return (
        <ClientOnly>
            <FavoritesClient
                currentUser={currentUser}
                listings={listings} />
        </ClientOnly>
    )
}

export default FavoritesPage
