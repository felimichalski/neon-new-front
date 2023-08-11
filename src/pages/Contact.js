import { Envelope } from '@styled-icons/fa-regular';
import { PhoneOutline } from '@styled-icons/evaicons-outline'
import emailjs from "@emailjs/browser"
import { useForm } from '@mantine/form';
import { useRef, useState } from 'react';
import { Loader } from '@mantine/core';
import { toast } from 'react-toastify';

import FileUpload from '../components/FileUpload';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Contact = () => {
    const [sending, setSending] = useState(false)

    const formRef = useRef()

    const form = useForm({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            message: "",
            files: [],
            height: undefined,
            width: undefined
        },
        validate: {
            first_name: (value) => (value === "" ? 'Campo requerido' : null),
            last_name: (value) => (value === "" ? 'Campo requerido' : null),
            email: (value) => (value === "" ? 'Campo requerido' : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? null : "Mail inválido"),
            message: (value) => (value === "" ? 'Campo requerido' : null),
            files: (value) => (value.length < 1 ? 'Campo requerido' : null),
            height: (value) => (!value ? 'Campo requerido' : null),
            width: (value) => (!value ? 'Campo requerido' : null)
        }
    })

    const handleSubmit = async () => {
        setSending(true)
        const response = await emailjs.sendForm("service_v8cqrk8", "template_s2spdei", formRef.current, "3VYT0PrO35TzxcFO_")
        if(response.status === 200) {
            toast.success("Mensaje enviado correctamente", { position: 'bottom-left' })
        } else {
            toast.error("Ha ocurrido un error. Intente de nuevo más tarde")
        }
        setSending(false)
    }

    return (
        <div className="relative isolate bg-white">
            <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
                <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
                    <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                        <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
                            <svg
                                className="absolute inset-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                                aria-hidden="true"
                            >
                                <defs>
                                    <pattern
                                        id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                                        width={200}
                                        height={200}
                                        x="100%"
                                        y={-1}
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <path d="M130 200V.5M.5 .5H200" fill="none" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" strokeWidth={0} fill="white" />
                                <svg x="100%" y={-1} className="overflow-visible fill-gray-50">
                                    <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                                </svg>
                                <rect width="100%" height="100%" strokeWidth={0} fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Contanos tu idea</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Mandá una foto de lo que querés neonizar para que lo podamos hacer realidad.
                        </p>
                        <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                    <span className="sr-only">Telephone</span>
                                    <PhoneOutline className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                </dt>
                                <dd>
                                    <a className="hover:text-gray-900" href="tel:+1 (555) 234-5678">
                                        +1 (555) 234-5678
                                    </a>
                                </dd>
                            </div>
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                    <span className="sr-only">Email</span>
                                    <Envelope className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                </dt>
                                <dd>
                                    <a className="hover:text-gray-900" href="mailto:hello@example.com">
                                        hello@example.com
                                    </a>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <form className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48" onSubmit={form.onSubmit(handleSubmit)} ref={formRef}>
                    <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Nombre
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        className={classNames(
                                            form.errors.first_name ? "ring-red-500" : "ring-gray-300",
                                            "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        )}
                                        onChange={(e) => form.setFieldValue("first_name", e.currentTarget.value)}
                                        {...form.getInputProps("first_name")}
                                    />
                                </div>
                                {form.errors.first_name &&
                                    <span
                                        style={{
                                            fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
                                            webkitTapHighlightColor: 'transparent',
                                            fontSize: '14px',
                                            lineHeight: '1.55',
                                            textDecoration: 'none',
                                            marginTop: '5px',
                                            wordBreak: 'break-word',
                                            color: '#fa5252'
                                        }}
                                    >
                                        {form.errors.first_name}
                                    </span>
                                }
                            </div>
                            <div>
                                <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Apellido
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        autoComplete="family-name"
                                        className={classNames(
                                            form.errors.last_name ? "ring-red-500" : "ring-gray-300",
                                            "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        )}
                                        onChange={(e) => form.setFieldValue("last_name", e.currentTarget.value)}
                                        {...form.getInputProps("last_name")}
                                    />
                                </div>
                                {form.errors.last_name &&
                                    <span
                                        style={{
                                            fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
                                            webkitTapHighlightColor: 'transparent',
                                            fontSize: '14px',
                                            lineHeight: '1.55',
                                            textDecoration: 'none',
                                            marginTop: '5px',
                                            wordBreak: 'break-word',
                                            color: '#fa5252'
                                        }}
                                    >
                                        {form.errors.last_name}
                                    </span>
                                }
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Correo electrónico
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        autoComplete="email"
                                        className={classNames(
                                            form.errors.email ? "ring-red-500" : "ring-gray-300",
                                            "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        )}
                                        onChange={(e) => form.setFieldValue("email", e.currentTarget.value)}
                                        {...form.getInputProps("email")}
                                    />
                                </div>
                                {form.errors.email &&
                                    <span
                                        style={{
                                            fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
                                            webkitTapHighlightColor: 'transparent',
                                            fontSize: '14px',
                                            lineHeight: '1.55',
                                            textDecoration: 'none',
                                            marginTop: '5px',
                                            wordBreak: 'break-word',
                                            color: '#fa5252'
                                        }}
                                    >
                                        {form.errors.email}
                                    </span>
                                }
                            </div>
                            <div>
                                <label htmlFor="height" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Alto aproximado (en cm)
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="number"
                                        name="height"
                                        id="height"
                                        autoComplete="height"
                                        className={classNames(
                                            form.errors.height ? "ring-red-500" : "ring-gray-300",
                                            "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        )}
                                        onChange={(e) => form.setFieldValue("height", e.currentTarget.value)}
                                        {...form.getInputProps("height")}
                                    />
                                </div>
                                {form.errors.height &&
                                    <span
                                        style={{
                                            fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
                                            webkitTapHighlightColor: 'transparent',
                                            fontSize: '14px',
                                            lineHeight: '1.55',
                                            textDecoration: 'none',
                                            marginTop: '5px',
                                            wordBreak: 'break-word',
                                            color: '#fa5252'
                                        }}
                                    >
                                        {form.errors.height}
                                    </span>
                                }
                            </div>
                            <div>
                                <label htmlFor="width" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Ancho aproximado (en cm)
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="number"
                                        name="width"
                                        id="width"
                                        autoComplete="width"
                                        className={classNames(
                                            form.errors.width ? "ring-red-500" : "ring-gray-300",
                                            "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        )}
                                        onChange={(e) => form.setFieldValue("width", e.currentTarget.value)}
                                        {...form.getInputProps("width")}
                                    />
                                </div>
                                {form.errors.width &&
                                    <span
                                        style={{
                                            fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
                                            webkitTapHighlightColor: 'transparent',
                                            fontSize: '14px',
                                            lineHeight: '1.55',
                                            textDecoration: 'none',
                                            marginTop: '5px',
                                            wordBreak: 'break-word',
                                            color: '#fa5252'
                                        }}
                                    >
                                        {form.errors.width}
                                    </span>
                                }
                            </div>
                            <div className="sm:col-span-2">
                                <FileUpload
                                multiple={false}
                                label="Imagen de referencia"
                                className="mt-2.5"
                                dropzoneClassName="block w-full rounded-md px-3.5 py-2 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                                onChange={files => {
                                    form.setFieldValue("files", files)
                                }}
                                {...form.getInputProps('files')}        
                                error={form.errors.files}/>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                                    ¿Dónde va a ir colocado?
                                </label>
                                <div className="mt-2.5">
                                    <textarea
                                        name="message"
                                        id="message"
                                        rows={4}
                                        className={classNames(
                                            form.errors.message ? "ring-red-500" : "ring-gray-300",
                                            "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        )}
                                        onChange={(e) => form.setFieldValue("message", e.currentTarget.value)}
                                        {...form.getInputProps("message")}
                                    />
                                </div>
                                {form.errors.message &&
                                    <span
                                        style={{
                                            fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
                                            webkitTapHighlightColor: 'transparent',
                                            fontSize: '14px',
                                            lineHeight: '1.55',
                                            textDecoration: 'none',
                                            marginTop: '5px',
                                            wordBreak: 'break-word',
                                            color: '#fa5252'
                                        }}
                                    >
                                        {form.errors.message}
                                    </span>
                                }
                            </div>
                        </div>
                        <div className="mt-8 flex justify-center">
                            <button
                                type="submit"
                                className="rounded-md bg-blue-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline"
                                disabled={sending}
                            >
                                {(sending) ? <Loader size='xs' /> : 'Enviar'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Contact;