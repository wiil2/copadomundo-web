import { ReactComponent as arrowBack } from './svgs/back.svg'
import { ReactComponent as arrowLeft } from './svgs/arrow-left.svg'
import { ReactComponent as arrowRight } from './svgs/arrow-right.svg'
import { ReactComponent as profile } from './svgs/profile.svg'

const icons = {
    arrowBack,
    arrowLeft,
    arrowRight,
    profile
}



export function Icon({ name, ...props }) {
    const Element = icons[name]
    return <Element {...props} />
}