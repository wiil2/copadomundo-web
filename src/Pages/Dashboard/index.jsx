import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAsyncFn, useLocalStorage } from 'react-use'
import { Icon, Card, DateSelect } from '~/components'
import axios from 'axios'
import { format, formatISO } from 'date-fns'

export function Dashboard() {
    const [currentDate, setDate] = useState(formatISO(new Date(2022, 10, 20)))
    const [auth] = useLocalStorage('auth', {})

    const [state, doFetch] = useAsyncFn(async (params) => {
        const res = await axios({
            method: 'get',
            baseURL: 'http://localhost:3000',
            url: '/games',
            params
        })
        return res.data
    })

    useEffect(() => {
        doFetch({ gameTime: currentDate })
    }, [currentDate])


    if (!auth?.user?.id) {
        return <Navigate to="/" replace={true} />
    }

    return (
        <>

            <header className="bg-red-500 text-white p-4">
                <div className="container max-w-3xl flex justify-between">
                    <img src="/src/assets/logo/logo-fundo-vermelho.svg" className="w-28 md:w-40 " />
                    <a href='/profile'>
                        <Icon name="profile" className="w-10" />
                    </a>
                </div>
            </header>

            <main className='space-y-6'>
                <section id='header' className="bg-red-500 text-white p-4">
                    <div className="container max-w-3xl space-y-2">
                        <span>Olá William</span>
                        <h3 className='text-2xl font-bold '>Qual o seu palpite?</h3>
                    </div>
                </section>

                <section id='content' className='container max-w-3xl p-4 space-y-4'>

                    <DateSelect currentDate={currentDate} onChange={setDate} />


                    <div className='space-y-4'>
                        {state.loading && 'Carregando Jogos...'}
                        {state.error && 'Ops! Algo deu errado.'}

                        {!state.loading && !state.error && state.value?.map(game => (
                            <Card
                                gameId={game.id}
                                homeTeam={game.homeTeam}
                                awayTeam={game.awayTeam}
                                gameTime={format(new Date(game.gameTime), 'H:mm')}
                            />
                        ))}
                    </div>
                </section>

            </main>
        </>
    )
}