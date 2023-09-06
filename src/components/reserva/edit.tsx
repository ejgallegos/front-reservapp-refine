import dayjs from "dayjs";
import { Form, Input, ModalProps, FormProps, Modal, InputNumber, DatePicker, Select } from "antd";
import { useSelect } from "@refinedev/antd";
import { IAlojamiento, ICliente } from "../../interfaces";

const dateFormat = "DD-MM-YYYY";
//const dateNow = dayjs();

type EditReservaProps = {
    modalProps: ModalProps;
    formProps: FormProps;
};

export const EditReserva: React.FC<EditReservaProps> = ({
    modalProps,
    formProps,
}) => {

    const { selectProps: clientes } = useSelect<ICliente>({
        resource: "clientes",
        optionValue: "id",
        optionLabel: "denominacion",
        //defaultValue: "id"
    });

    const { selectProps: alojamientos } = useSelect<IAlojamiento>({
        resource: "alojamientos",
        optionValue: "id",
        optionLabel: "denominacion",
        //defaultValue: "id"
    });

    return (
        <Modal {...modalProps} title="Editar Reserva">
            <Form {...formProps}
                layout="vertical"
                initialValues={{
                    isActive: true,
                    ...formProps.initialValues,
                }}>
                <Form.Item
                    label='Fecha de Reserva'
                    name='fechaReserva'
                    rules={[
                        {
                            required: true,
                            message: "Campo requerido",
                        },
                    ]}
                    getValueProps={(value) => ({
                        value: value ? dayjs(value) : null,
                    })}
                >
                    <DatePicker format={dateFormat} />
                </Form.Item>
                <Form.Item
                    label='Fecha Desde'
                    name='fechaDesde'
                    rules={[
                        {
                            required: true,
                            message: "Campo requerido",
                        },
                    ]}
                    getValueProps={(value) => ({
                        value: value ? dayjs(value) : null,
                    })}
                >
                    <DatePicker format={dateFormat} />
                </Form.Item>
                <Form.Item
                    label='Fecha Hasta'
                    name='fechaHasta'
                    rules={[
                        {
                            required: true,
                            message: "Campo requerido",
                        },
                    ]}
                    getValueProps={(value) => ({
                        value: value ? dayjs(value) : null,
                    })}
                >
                    <DatePicker format={dateFormat} />
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
                        allowClear
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
                        {...alojamientos}
                        showSearch
                        placeholder="Seleccione Alojamiento"
                        allowClear
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};
