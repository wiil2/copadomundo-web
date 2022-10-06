import { Icon, Card, DateSelect } from '~/components'

export function Profile() {
    return (
        <>

            <header className="bg-red-500 text-white p-4">
                <div className="container max-w-3xl flex justify-between">
                    <img src="/src/assets/logo/logo-fundo-vermelho.svg" className="w-28 md:w-40 " />
                </div>
            </header>

            <main className='space-y-6'>
                <section id='header' className="bg-red-500 text-white p-4">
                    <div className="container max-w-3xl space-y-2">
                        <a href='/dashboard'>
                            <Icon name="arrowBack" className="h-6" />
                        </a>
                        <h3 className='text-2xl font-bold '>William Berbet</h3>
                    </div>
                </section>

                <section id='content' className='container max-w-3xl p-4 space-y-4'>
                    <h3 className='text-xl font-bold text-red-500'>Seus Palpites</h3>


                    <DateSelect />

                    <div className='space-y-4'>
                        <Card
                            timeA={{ slug: 'sui' }}
                            timeB={{ slug: 'cam' }}
                            match={{ time: '7:00' }}
                        />
                        <Card
                            timeA={{ slug: 'uru' }}
                            timeB={{ slug: 'cor' }}
                            match={{ time: '7:00' }}
                        />
                        <Card
                            timeA={{ slug: 'por' }}
                            timeB={{ slug: 'gan' }}
                            match={{ time: '7:00' }}
                        />
                    </div>
                </section>

            </main>
        </>
    )
}