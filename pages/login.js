import React, {useState} from 'react';
import { useRouter } from 'next/router';

import Layout from '../components/Layout';
import * as Yup from "yup";
import {useFormik} from "formik/dist/index";
import {useMutation, gql} from "@apollo/client/";


const AUTENTICAR_USUARIO = gql`
        mutation autenticarUsuario($input: AutenticarInput) {
            autenticarUsuario(input: $input) {
                token
            }
        }`;


const Login = () => {
    const [mensaje, guardarMensaje] = useState(null);


    //Mutation para crear nuevos usuarios en apollo
    const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);

    //Routing
    const router =useRouter();

    //Validacion del formulario
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },

        onSubmit: async valores => {
            console.log(valores)

            const {email, password} = valores;
            try {
                const {data} = await autenticarUsuario({
                    variables: {
                        input: {
                            email,
                            password

                        }
                    }
                });
                console.log("RESPUESTA APOLLO");
                console.log(data);
                guardarMensaje('Autenticando... ');


                //Guardar Token en localStorage
                const { token } = data.autenticarUsuario;
                localStorage.setItem('token', token);


                //Redireccionar
                setTimeout(()=>{
                    guardarMensaje(null);
                    router.push("/")
                },1000);



            } catch (error) {
                console.log("ERROR RESPUESTA  APOLLO");
                guardarMensaje(error.message);
                console.log(error);
                setTimeout(()=>{
                    guardarMensaje(null);
                },3000);


            }


        }

    });
    const mostrarMensaje = () =>{
        return (
            <div className={"bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto"}>
                <p>{mensaje}</p>
            </div>
        )
    }
    return (
        <div>
            <Layout>
                <h1 className="text-center text-2xl text-white font-light">Login</h1>
                {mensaje && mostrarMensaje()}

                <div className="flex justify-center mt-5">

                    <div className="w-full max-w-sm">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                              onSubmit={formik.handleSubmit}
                        >
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tigth focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Email Usuario"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
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
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
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

export default Login;
