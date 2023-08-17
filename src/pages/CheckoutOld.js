import { Button, Container, Group, Stack, TextInput, Title, createStyles } from '@mantine/core'

import { useState } from 'react';
import { useDocumentTitle } from '@mantine/hooks';
import { useForm } from '@mantine/form';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css'
import { PaymentModal } from '../components/PaymentModal';

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
}

const useStyles = createStyles((_, { error }) => ({
    phoneInput: {
        borderColor: error && 'red !important'
    },

    phoneContainer: {
        color: error && 'red'
    }
}))

const Checkout = () => {

    useDocumentTitle('Neon infinito - Checkout')
    const [paymentModalOpen, setPaymentModalOpen] = useState(false)

    const form = useForm({
        initialValues,
        validate: {
            firstName: (val) => val.length > 0 ? null : 'Debe ingresar su nombre',
            lastName: (val) => val.length > 0 ? null : 'Debe ingresar su apellido',
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Mail inválido'),
            address: (val) => val.length > 0 ? null : 'Debe ingresar su dirección',
            phone: (val) => val.length > 6 ? null : 'Debe ingresar su número de teléfono',
        },
    });
    
    const { classes } = useStyles({ error: form.errors.phone});

    const validateData = () => {
        const { hasErrors } = form.validate()
        if(!hasErrors) {
            setPaymentModalOpen(true)
        }
    }

    return (
        <Container my={30} fluid style={{
            width: '80vw',
            maxWidth: '35rem'
        }}>
            <form onSubmit={form.onSubmit(validateData)}>
                <Stack>
                    <Title weight={500} mb={30} style={{
                        fontSize: 30,
                        fontFamily: 'ITC Avant Garde Gothic'
                    }}>
                        Información requerida
                    </Title>
                    <Group style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <TextInput
                            required
                            label="Nombre"
                            placeholder="Tu nombre"
                            value={form.values.firstName}
                            onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
                            radius="md"
                            error={form.errors.firstName}
                            style={{
                                width: '45%'
                            }}
                        />
                        <TextInput
                            required
                            label="Apellido"
                            placeholder="Tu apellido"
                            value={form.values.lastName}
                            onChange={(event) => form.setFieldValue('lastName', event.currentTarget.value)}
                            radius="md"
                            error={form.errors.lastName}
                            style={{
                                width: '45%'
                            }}
                        />
                    </Group>

                    <TextInput
                        required
                        label="Mail"
                        placeholder="ejemplo@ejemplo.com"
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                        error={form.errors.email}
                        radius="md"
                    />

                    <TextInput
                        required
                        label="Dirección"
                        placeholder="Tu dirección"
                        value={form.values.address}
                        onChange={(event) => form.setFieldValue('address', event.currentTarget.value)}
                        radius="md"
                        error={form.errors.address}
                    />

                    <PhoneInput
                        country='ar'
                        inputStyle={{
                            width: '100%',
                        }}
                        specialLabel='Número de teléfono'
                        onChange={(value) => form.setFieldValue('phone', value)}
                        radius="md"
                        value={form.values.phone}
                        inputClass={classes.phoneInput}
                        containerClass={classes.phoneContainer}
                    />
                    {form.errors.phone && 
                    <span style={{
                        WebkitTapHighlightColor: 'transparent',
                        webkitTextDecoration: 'none',
                        textDecoration: 'none',
                        wordBreak: 'break-word',
                        color: '#fa5252',
                        fontSize: 12,
                        lineHeight: 1.2,
                        display: 'block'
                    }}>{form.errors.phone}</span>
                    }
                    <Button type='submit' style={{backgroundColor: '#228BE6'}}>Elegir método de pago</Button>
                </Stack>
            </form>
            <PaymentModal opened={paymentModalOpen} setOpened={setPaymentModalOpen} info={form.values}/>
        </Container>
    )
}

export default Checkout