import { Edit, useSelect } from "@refinedev/antd";
import {
    Drawer,
    DrawerProps,
    Form,
    FormProps,
    Input,
    ButtonProps,
    Grid,
    Select,
} from "antd";

type EditClienteProps = {
    drawerProps: DrawerProps;
    formProps: FormProps;
    saveButtonProps: ButtonProps;
};

export const EditCliente: React.FC<EditClienteProps> = ({
    drawerProps,
    formProps,
    saveButtonProps,
}) => {
    const breakpoint = Grid.useBreakpoint();

    // const { selectProps } = useSelect({
    //     resource: "contacts",
    //     optionLabel: "first_name",

    //     pagination: {
    //         mode: "server",
    //     },
    // });

    return (
        <Drawer
            {...drawerProps}
            width={breakpoint.sm ? "500px" : "100%"}
            bodyStyle={{ padding: 0 }}
            title={"Editar Cliente"}
            style={{ padding: '5px' }}
        >
            <Edit
                saveButtonProps={saveButtonProps}
                title={""}
                goBack={false}
            >
                <Form
                    {...formProps}
                    layout="vertical"
                    initialValues={{
                        isActive: true,
                        ...formProps.initialValues,
                    }}
                >
                    <Form.Item
                        label="Nombre y Apellido"
                        name="denominacion"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Teléfono"
                        name="telefono"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="E-mail"
                        name="email"
                    >
                        <Input />
                    </Form.Item>
                    {/* <Form.Item label="Select Contact" name="contacts">
                        <Select {...selectProps} mode="multiple" />
                    </Form.Item> */}
                </Form>
            </Edit>
        </Drawer>
    );
};
