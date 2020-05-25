import Layout from '../components/Layout';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useQuery,} from '@apollo/client';
import {useMutation, gql} from '@apollo/client';


const NUEVA_CUENTA = gql`
        mutation nuevoUsuario($input: UsuarioInput) {
          nuevoUsuario(input: $input){
            id
            nombre
            apellido
            email
          }
        }`;

const QUERY = gql`
        query obtenerUsuario {
            obtenerUsuario{
                id
                nombre
            }
        }`;

const NuevaCuenta = () => {

    //Mutation para crear nuevos usuarios
    const [nuevoUsuario] = useMutation(NUEVA_CUENTA);


    //Obtener productos de Graphql
    /*const {data, loading, error} = useQuery(QUERY);

    console.log(data);
    console.log(loading);
    console.log(error);
    */


    //Validacion del formulario
    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre es obligatorio'),
            apellido: Yup.string().required('El apellido es obligatorio'),
            email: Yup.string().email('el email no es valido').required('El email es obligatorio'),
            password: Yup.string().required('El password es obligatorio').min(6, 'el password debe ser de más de 5 caracteres'),
        }),
        onSubmit: async valores => {
            console.log('enviando')
            console.log(valores)
            const {nombre, apellido, email, password} = valores;
            try {
                await nuevoUsuario({
                    variables: {
                        input: {
                            nombre,
                            apellido,
                            email,
                            password
                        }

                    }
                })

            }
            catch(error) {
                console.log("CAGO")
                console.log(error);

            }
        }
    });
    return (
        <div>
            <Layout>
                <h1 className="text-center text-2xl text-white font-light">Nueva Cuenta</h1>

                <div className="flex justify-center mt-5">

                    <div className="w-full max-w-sm">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                              onSubmit={formik.handleSubmit}
                        >
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                    Nombre
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tigth focus:outline-none focus:shadow-outline"
                                    id="nombre"
                                    type="text"
                                    placeholder="Nombre Usuario"
                                    value={formik.values.nombre}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            {formik.errors.nombre ?
                                (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.nombre}</p>

                                    </div>
                                )
                                : null
                            }
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                                    Apellido
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tigth focus:outline-none focus:shadow-outline"
                                    id="apellido"
                                    type="text"
                                    placeholder="Apellido Usuario"
                                    value={formik.values.apellido}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            {formik.errors.apellido ?
                                (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.apellido}</p>

                                    </div>
                                )
                                : null
                            }
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tigth focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Email Usuario"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            {formik.errors.email ?
                                (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.email}</p>

                                    </div>
                                )
                                : null
                            }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tigth focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="Password Usuario"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            {formik.errors.password ?
                                (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.password}</p>

                                    </div>
                                )
                                : null
                            }

                            <input
                                type="submit"
                                className="bg-gray-800 w-full mt-5 pt-2 text-white uppercas hover:bg-gray-9git 00"
                                value="Iniciar Sesión"
                            />
                        </form>

                    </div>

                </div>


            </Layout>
        </div>)
};

export default NuevaCuenta;
