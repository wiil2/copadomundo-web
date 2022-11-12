import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAsyncFn, useLocalStorage } from 'react-use'
import { Icon, Card, DateSelect } from '~/components'
import axios from 'axios'
import { format, formatISO } from 'date-fns'

export function Profile() {
    const params = useParams()
    const navigate = useNavigate()
    const [currentDate, setDate] = useState(formatISO(new Date(2022, 10, 20)))
    const [auth, setAuth] = useLocalStorage('auth', {})

    const [{ value: user, loading, error }, fetchHunches] = useAsyncFn(async () => {
        const res = await axios({
            method: 'get',
            baseURL: import.meta.env.VITE_API_URL,
            url: `/${params.username}`,

        })

        const hunches = res.data.hunches.reduce((acc, hunch) => {
            acc[hunch.gameId] = hunch
            return acc
        }, {})


        return {
            ...res.data,
            hunches
        }
    })

    const [games, fetchGames] = useAsyncFn(async (params) => {
        const res = await axios({
            method: 'get',
            baseURL: import.meta.env.VITE_API_URL,
            url: '/games',
            params
        })
        return res.data
    })

    function logOut() {
        setAuth({})
        navigate("/login")
    }

    const isLoading = games.loading || loading
    const hasError = games.error || error
    const isDone = !isLoading && !hasError

    useEffect(() => {
        fetchHunches()
    }, [])

    useEffect(() => {
        fetchGames({ gameTime: currentDate })
    }, [currentDate])


    /* if (!auth?.user?.id) {
        return <Navigate to="/" replace={true} />
    }
 */

    return (
        <>

            <header className="bg-red-500 text-white p-4">
                <div className="container max-w-3xl flex justify-between">
                    <img src="/src/assets/logo/logo-fundo-vermelho.svg" className="w-28 md:w-40 " />
                    {auth?.user?.id && (
                        <div onClick={logOut} className="o-2 cursor-pointer">
                            Sair
                        </div>
                    )}
                </div>
            </header>

            <main className='space-y-6'>
                <section id='header' className="bg-red-500 text-white p-4">
                    <div className="container max-w-3xl space-y-2">
                        <a href='/dashboard'>
                            <Icon name="arrowBack" className="h-6" />
                        </a>
                        <h3 className='text-2xl font-bold '>{user?.name}</h3>
                    </div>
                </section>

                <section id='content' className='container max-w-3xl p-4 space-y-4'>
                    <h3 className='text-xl font-bold text-red-500'>Seus Palpites</h3>


                    <DateSelect currentDate={currentDate} onChange={setDate} />

                    <div className='space-y-4'>
                        {isLoading && 'Carregando Jogos...'}
                        {hasError && 'Ops! Algo deu errado.'}



                        {isDone && games.value?.map(game => (
                            <Card
                                key={game.id}
                                gameId={game.id}
                                homeTeam={game.homeTeam}
                                awayTeam={game.awayTeam}
                                gameTime={format(new Date(game.gameTime), 'H:mm')}
                                homeTeamScore={user?.hunches?.[game.id]?.homeTeamScore || ''}
                                awayTeamScore={user?.hunches?.[game.id]?.awayTeamScore || ''}
                                disabled={true}
                            />
                        ))}
                    </div>
                </section>

            </main>
        </>
    )
}