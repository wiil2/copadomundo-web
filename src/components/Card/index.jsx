export function Card({ timeA, timeB, match }) {
    return (
        <div className='rounded-xl border border-gray-300 p-4 text-center space-y-4'>
            <span className='text-sm md:text-base text0gray-700 font-bold'>
                {match.time}
            </span>
            <div className='flex space-x-4 justify-center items-center'>
                <span className='uppercase'>{timeA.slug}</span>
                <img src={`src/assets/bandeiras/${timeA.slug}.png`} />

                <input type="number" className='bg-red-300/[0.2] w-[55px] h-[55px] text-red-700 text-xl text-center' />
                <span className='text-red-500 font-bold'>X</span>
                <input type="number" className='bg-red-300/[0.2] w-[55px] h-[55px] text-red-700 text-xl text-center' />


                <img src={`src/assets/bandeiras/${timeB.slug}.png`} />
                <span className='uppercase'>{timeB.slug}</span>
            </div>
        </div>
    )
}