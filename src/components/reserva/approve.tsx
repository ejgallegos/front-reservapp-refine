import dayjs from "dayjs";
import { Form, Input, ModalProps, FormProps, Modal, InputNumber, DatePicker, Select } from "antd";
import { useSelect } from "@refinedev/antd";
import { IAlojamiento, ICliente, IReserva } from "../../interfaces";

const dateFormat = "DD-MM-YYYY";
//const dateNow = dayjs();

type ApproveReservaProps = {
    modalProps: ModalProps;
    formProps: FormProps;
};

export const ApproveReserva: React.FC<ApproveReservaProps> = ({
    modalProps,
    formProps,
}) => {

    const { selectProps: reservas } = useSelect<IReserva>({
        resource: "reservas",
        optionValue: "id",
        optionLabel: "estado",
    });


    return (
        <Modal {...modalProps} title="Aprobar Reserva">
            <Form {...formProps}
                layout="vertical"
                initialValues={{
                    isActive: true,
                    ...formProps.initialValues,
                }}>

                <Form.Item
                    label="Estado"
                    name="estado"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        //{...reservas}
                        showSearch
                        placeholder="Seleccione Cliente"
                        allowClear
                        options={[
                            {
                                label: "Aprobado",
                                value: "Aprobado",
                            },

                        ]}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};
