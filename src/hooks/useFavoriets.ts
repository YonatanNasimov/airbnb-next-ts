import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { SafeUser } from '@/types'
import useLoginModal from './useLoginModal'

interface IUseFavoriets {
    listingId: string;
    currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavoriets) => {

    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(listingId);
    }, [currentUser, listingId])

    const toggleFavorite = useCallback(
        async (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();

            if (!currentUser) {
                return loginModal.onOpen();
            }

            try {
                let request;
                let toastMessage: string = ''

                if (hasFavorited) {
                    request = () => axios.delete(`/api/favorites/${listingId}`);
                    toastMessage = 'Removed successfuly'
                } else {
                    request = () => axios.post(`/api/favorites/${listingId}`)
                    toastMessage = 'Added successfuly'
                }

                await request();
                router.refresh();
                toast.success(toastMessage);
            } catch (error) {
                toast.error('Something went worng')
            }
        }, [currentUser, hasFavorited, listingId, loginModal, router])

    return { hasFavorited, toggleFavorite }
}

export default useFavorite;