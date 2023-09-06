import { useApiUrl } from "@refinedev/core";
import { Modal, Form, Input, Grid, ModalProps, FormProps, Upload } from "antd";

import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";

import { TOKEN_KEY } from "../../constants";

const { TextArea } = Input;

type CreateAlojamientoProps = {
    modalProps: ModalProps;
    formProps: FormProps;
};

export const CreateAlojamiento: React.FC<CreateAlojamientoProps> = ({
    modalProps,
    formProps,
}) => {
    const breakpoint = Grid.useBreakpoint();
    const API_URL = useApiUrl();

    return (
        <Modal
            {...modalProps}
            title="Registrar Alojamiento"
            width={breakpoint.sm ? "600px" : "80%"}
        >
            <Form
                {...formProps}
                layout="vertical"
                onFinish={(values) => {
                    formProps.onFinish?.(mediaUploadMapper(values));
                }}
            >
                <Form.Item
                    label="Nombre"
                    name="denominacion"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="E-mail" name="email">
                    <Input />
                </Form.Item>
                <Form.Item label="Teléfono" name="telefono">
                    <Input />
                </Form.Item>
                <Form.Item label="Capacidad" name="capacidad">
                    <Input />
                </Form.Item>
                <Form.Item label="Imagen URL" name="imagen">
                    <Input />
                </Form.Item>
                <Form.Item label="Descripción" name="descripcion">
                    <TextArea rows={8} />
                </Form.Item>
                {/* <Form.Item label="Company Logo">
                    <Form.Item
                        name={"logo"}
                        valuePropName="fileList"
                        getValueProps={(data) => getValueProps(data, API_URL)}
                        noStyle
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Upload.Dragger
                            name="files"
                            action={`${API_URL}/upload`}
                            headers={{
                                Authorization: `Bearer ${localStorage.getItem(
                                    TOKEN_KEY,
                                )}`,
                            }}
                            listType="picture"
                            multiple
                        >
                            <p className="ant-upload-text">
                                Drag & drop a file in this area
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item> */}
            </Form>
        </Modal>
    );
};
