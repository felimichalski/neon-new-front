import { useDispatch, useSelector } from 'react-redux';

import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Group,
    Button,
    Checkbox,
    Anchor,
    Stack,
    Modal,
    Title,
} from '@mantine/core';
import { registerUser, userLogin } from '../../features/actions/authActions';
// import { GoogleButton, TwitterButton } from '../SocialButtons/SocialButtons';

import { toast } from "react-toastify";
import validatePassword from '../../utils/validatePassword';

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    terms: false,
}

export function AuthModal({ opened, setOpened }) {
    const [type, toggle] = useToggle(['Iniciar sesión', 'Registrarse']);

    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth);

    const form = useForm({
        initialValues,        
        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Mail inválido'),
            password: (val) => (type === 'Registrarse' ? (validatePassword(val) ? null : 'La contraseña debe contener más de 6 caracteres y al menos una letra mayúscula, una letra minúscula y un número') : null)
        },
    });

    const signup = async () => {
        const { hasErrors } = form.validate()
        if (!userData.userToken && form.values.terms && !hasErrors) {
            const response = await dispatch(registerUser({
                email: form.values.email,
                password: form.values.password,
                firstName: form.values.firstName,
                lastName: form.values.lastName
            }));
            console.log(response)
            if (response.meta.requestStatus === 'fulfilled') {
                toast.success("Usuario registrado con éxito", {
                    position: "bottom-left",
                  });
                setOpened(false);
                form.setValues(initialValues)
            } else if (response.meta.requestStatus === 'rejected') {
                toast.error("No se ha podido crear el usuario", {
                    position: "bottom-left",
                });
                setOpened(false);
                form.setValues(initialValues)
            }
        }
    }

    const login = async () => {
        const { hasErrors } = form.validate()
        if (!userData.userToken && !hasErrors) {
            const response = await dispatch(userLogin({
                email: form.values.email,
                password: form.values.password
            }));
            if (response.meta.requestStatus === 'fulfilled') {
                setOpened(false);
                form.setValues(initialValues)
            } else if (response.meta.requestStatus === 'rejected') {
                form.setErrors({
                    email: 'Usuario o contraseña incorrectos'
                })
            }
        }
    }

    return (
        <Modal
            radius="md"
            p="xl"
            opened={opened}
            onClose={() => {
                setOpened(false)
                form.clearErrors()
                form.setValues(initialValues)
            }}
            centered
            zIndex={10000000}
            transitionDuration={200}
            exitTransitionDuration={200}
        >
            <Title weight={500} mb={30} style={{
                fontSize: 30,
                fontFamily: 'ITC Avant Garde Gothic'
            }}>
                {type}
            </Title>

            {/* <Group grow mb="md" mt="md"> */}
            {/* <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton> */}
            {/* </Group> */}

            {/* <Divider label="Or continue with email" labelPosition="center" my="lg" /> */}

            <form onSubmit={form.onSubmit(() => { })}>
                <Stack>
                    {type === 'Registrarse' && (
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
                                style={{
                                    width: '45%'
                                }}
                            />
                        </Group>
                    )}

                    <TextInput
                        required
                        label="Mail"
                        placeholder="ejemplo@ejemplo.com"
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                        error={form.errors.email}
                        radius="md"
                    />

                    <PasswordInput
                        required
                        label="Contraseña"
                        placeholder="••••••••••"
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        error={form.errors.password}
                        radius="md"
                    />

                    {type === 'Registrarse' && (
                        <Checkbox
                            label="I accept terms and conditions"
                            checked={form.values.terms}
                            onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                        />
                    )}
                </Stack>

                <Group position="apart" mt="xl">
                    <Anchor
                        component="button"
                        type="button"
                        color="dimmed"
                        onClick={() => toggle()}
                        size="xs"
                    >
                        {type === 'Registrarse'
                            ? 'Already have an account? Login'
                            : "Don't have an account? Register"}
                    </Anchor>
                    <Button type="submit" radius="xl" onClick={type === 'Registrarse' ? signup : login}>
                        {upperFirst(type)}
                    </Button>
                </Group>
            </form>
        </Modal>
    );
}