import { useState } from "react";

import dayjs from "dayjs";
import "dayjs/locale/es";
import locale from "antd/es/date-picker/locale/es_ES";

import { useSelect } from "@refinedev/antd";
import { Form, ModalProps, FormProps, Modal, Select, DatePicker, Button } from "antd";

import { useList } from "@refinedev/core";
import { IAlojamiento, IReserva } from "../../interfaces";

const dateFormat = "DD-MM-YYYY";
//const dateNow = dayjs();

type CreateReservaProps = {
    modalProps: ModalProps;
    formProps: FormProps;
};

export const CreateReserva: React.FC<CreateReservaProps> = ({
    modalProps,
    formProps,
}) => {

    const { selectProps: clientes } = useSelect({
        resource: "clientes",
        optionValue: "id",
        optionLabel: "denominacion",
    });


    /**
     * Fechas Reservadas
    */
    const [disabledSelect, setDisabledSelect] = useState(true);
    const [alojamientoDisponible, setAlojamientoDisponible] = useState<
        {
            id: number;
            alojamiento: string;
        }[]
    >([]);

    const reservas = useList<IReserva>({
        resource: "reservas",
        metaData: {
            populate: "*",
        },
    });

    const fechasReservadas = reservas?.data?.data.map((e) => {
        return {
            id: e.id,
            fechaDesdeReserva: new Date(e.fechaDesde),
            fechaHastaReserva: new Date(e.fechaHasta),
            alojamiento: e.alojamiento.denominacion
        };
    }) || [];
    /**
    * Fechas Reservadas
    */
    /**
     * Alojamientos Reservados
     */
    const listAlojamientos = useList<IAlojamiento>({
        resource: "alojamientos",
        metaData: {
            populate: "*",
        },
    });

    const alojamientosReservados = listAlojamientos?.data?.data.map((e) => {
        return {
            id: e.id,
            alojamiento: e.denominacion
        };
    }) || [];
    /**
    * Alojamientos Reservadas
    */

    const { form } = formProps;
    const fechaHasta = Form.useWatch("fechaHasta", form);
    const fechaDesde = Form.useWatch("fechaDesde", form);
    const fechaHastaCurrent = JSON.stringify(fechaHasta)?.slice(1, 11);

    const fechaDesdeCurrent = JSON.stringify(fechaDesde)?.slice(1, 11);
    const fechasCurrent = {
        fechaDesde: new Date(fechaDesdeCurrent),
        fechaHasta: new Date(fechaHastaCurrent),
    };

    const getHandleNroHabitacion = () => {
        setDisabledSelect(false);

        let filteredReservations = [];

        for (let i = 0; i < fechasReservadas.length; i++) {
            if (
                (fechasReservadas[i].fechaDesdeReserva >= fechasCurrent.fechaDesde &&
                    fechasReservadas[i].fechaDesdeReserva < fechasCurrent.fechaHasta) ||
                (fechasReservadas[i].fechaHastaReserva > fechasCurrent.fechaDesde &&
                    fechasReservadas[i].fechaHastaReserva <= fechasCurrent.fechaHasta) ||
                (fechasReservadas[i].fechaDesdeReserva <= fechasCurrent.fechaDesde &&
                    fechasReservadas[i].fechaHastaReserva >= fechasCurrent.fechaHasta)
            ) {
                filteredReservations.push(fechasReservadas[i]);
            }
        }

        let alojamientosFiltrados =
            filteredReservations.filter((fr) => fr.alojamiento) || [];



        let alojamientosDisponibles = alojamientosReservados?.filter(
            (f) =>
                !alojamientosFiltrados
                    .map((e) => e.alojamiento)
                    .includes(f.alojamiento)
        );

        setAlojamientoDisponible([...alojamientosDisponibles]);
    };

    const onReset = () => {
        form?.resetFields();
    };

    return (
        <Modal {...modalProps} title="Registrar Reserva">
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label='Fecha de Reserva'
                    name='fechaReserva'
                    rules={[
                        {
                            required: true,
                            message: "Campo requerido",
                        },
                    ]}>
                    <DatePicker
                        locale={locale}
                        //defaultValue={dayjs()}
                        format={dateFormat}
                    />
                </Form.Item>
                <Form.Item
                    label='Fecha Desde'
                    name='fechaDesde'
                    rules={[
                        {
                            required: true,
                        },
                    ]}>
                    <DatePicker locale={locale} format={dateFormat} />
                </Form.Item>
                <Form.Item
                    label='Fecha Hasta'
                    name='fechaHasta'
                    rules={[
                        {
                            required: true,
                        },
                    ]}>
                    <DatePicker locale={locale} format={dateFormat} />
                </Form.Item>
                <Form.Item
                    label="Cliente"
                    name="cliente"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        {...clientes}
                        showSearch
                        placeholder="Seleccione Cliente"
                        onChange={getHandleNroHabitacion}
                    />
                </Form.Item>
                <Form.Item
                    label="Alojamiento"
                    name="alojamiento"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        disabled={disabledSelect}
                        // {...alojamientos}
                        // showSearch
                        placeholder="Seleccione Alojamiento"
                    >
                        {alojamientoDisponible?.map((e) => {
                            return (
                                <Select.Option key={e.alojamiento} value={e.id}>
                                    {e.alojamiento}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
