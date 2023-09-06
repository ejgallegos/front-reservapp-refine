import { Create, useSelect, useModalForm } from "@refinedev/antd";

import {
    Drawer,
    DrawerProps,
    Form,
    FormProps,
    Input,
    ButtonProps,
    Grid,
    Select,
    Button,
} from "antd";

// import { IContact } from "../../interfaces";
// import { CreateContact } from "../../components/contact";

type CreateClienteProps = {
    drawerProps: DrawerProps;
    formProps: FormProps;
    saveButtonProps: ButtonProps;
};

export const CreateCliente: React.FC<CreateClienteProps> = ({
    drawerProps,
    formProps,
    saveButtonProps,
}) => {
    const breakpoint = Grid.useBreakpoint();

    // const { selectProps } = useSelect<IContact>({
    //     resource: "contacts",
    //     optionLabel: "first_name",

    //     pagination: {
    //         mode: "server",
    //     },
    // });

    // const {
    //     formProps: createContactFormProps,
    //     modalProps,
    //     show,
    // } = useModalForm({
    //     resource: "contacts",
    //     action: "create",
    //     redirect: false,
    // });

    return (
        <>
            <Drawer
                {...drawerProps}
                width={breakpoint.sm ? "500px" : "100%"}
                bodyStyle={{ padding: 0 }}
                title={"Registrar Cliente"}
                style={{ padding: '5px' }}
            >
                <Create title={""}
                    saveButtonProps={saveButtonProps}
                    goBack={false}
                >
                    <Form
                        {...formProps}
                        layout="vertical"
                        initialValues={{
                            isActive: true,
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
                        {/* <Form.Item label="Select Contact">
                            <div style={{ display: "flex" }}>
                                <Form.Item name={"contacts"} noStyle>
                                    <Select {...selectProps} mode="multiple" />
                                </Form.Item>
                                <Button type="link" onClick={() => show()}>
                                    Create Contact
                                </Button>
                            </div>
                        </Form.Item> */}
                    </Form>
                </Create>
            </Drawer>

            {/* <CreateContact
                modalProps={modalProps}
                formProps={createContactFormProps}
            /> */}
        </>
    );
};
