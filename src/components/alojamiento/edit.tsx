import { Modal, Form, Input, Grid, ModalProps, FormProps, Upload } from "antd";
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";

import { TOKEN_KEY, API_URL } from "../../constants";

const { TextArea } = Input;

type EditAlojamientoProps = {
    modalProps: ModalProps;
    formProps: FormProps;
};

export const EditAlojamiento: React.FC<EditAlojamientoProps> = ({
    modalProps,
    formProps,
}) => {
    const breakpoint = Grid.useBreakpoint();

    return (
        <Modal
            {...modalProps}
            title="Editar Alojamiento"
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
                {/* <Form.Item label="Imagen">
                    <Form.Item
                        name={"imagen"}
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
                            action={`${API_URL}/api/upload`}
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
