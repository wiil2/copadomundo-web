import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Icon, Input } from '~/components'
import { Navigate } from 'react-router-dom'
import { useLocalStorage } from 'react-use'

const validationSchema = yup.object().shape({
    name: yup.string().required('Preencha com seu nome!'),
    username: yup.string().required('Preencha com seu nome de usuário'),
    email: yup.string().email('Informe um e-mail válido').required('Preencha com seu email!'),
    password: yup.string().required('Preencha com seu senha!')
});


export function Signup() {
    const [auth, setAuth] = useLocalStorage('auth', {})

    const formik = useFormik({
        onSubmit: async (values) => {
            const res = await axios({
                method: 'post',
                baseURL: import.meta.env.VITE_API_URL,
                url: '/users',
                data: values
            })

            console.log(res.data)
        },
        initialValues: {
            name: '',
            username: '',
            email: '',
            password: '',
        },
        validationSchema
    })

    if (auth?.user?.id) {
        return <Navigate to="/dashboard" replace={true} />
    }

    return (
        <div>
            <header className="p-4 border-b border-red-300">
                <div className="container max-w-xl flex justify-center">
                    <img src="/src/assets/logo/logo-fundo-branco.svg" className="w-32 md:w-40" />
                </div>
            </header>

            <main className="container max-w-xl p-4">
                <div className="p-4 flex space-x-4 items-center">
                    <a href='/'>
                        <Icon name="arrowBack" className="h-6" />
                    </a>


                    <h2 className="text-xl font-bold">Crie a sua conta</h2>
                </div>

                <form className="p-4 space-y-6" onSubmit={formik.handleSubmit}>
                    <Input
                        type="text"
                        name="name"
                        label="Seu nome"
                        error={formik.touched.name && formik.errors.name}
                        placeholder="Digite seu nome"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <Input
                        type="text"
                        name="username"
                        label="Seu nome de usuário"
                        error={formik.touched.username && formik.errors.username}
                        placeholder="Digite um nome de usuário"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <Input
                        type="text"
                        name="email"
                        label="Seu e-mail"
                        error={formik.touched.email && formik.errors.email}
                        placeholder="Digite seu e-mail"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <Input
                        type="password"
                        name="password"
                        label="Sua Senha"
                        error={formik.touched.password && formik.errors.password}
                        placeholder="Digite seu senha"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <button type="submit"
                        className="block w-full text-center text-white bg-red-500 p-5 px-6 py-3 rounded-xl disabled:opacity-50"
                        disabled={!formik.isValid || formik.isSubmitting}>
                        {formik.isSubmitting ? 'Carregando...' : 'Criar minha conta'}
                    </button>
                </form>
            </main>




        </div>
    )
}

export default Signup;