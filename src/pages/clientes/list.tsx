import { IResourceComponentsProps, HttpError } from "@refinedev/core";
import {
    useSimpleList,
    List,
    useDrawerForm,
    CreateButton,
} from "@refinedev/antd";
import { List as AntdList } from "antd";

import { ICliente } from "../../interfaces";
import { ClienteItem, CreateCliente, EditCliente } from "../../components/cliente";

export const ClienteList: React.FC<IResourceComponentsProps> = () => {
    const //`useSimpleList` does not accept all of Ant Design's `List` component props anymore. You can directly use `List` component instead.,
        { listProps } = useSimpleList<ICliente>();

    const {
        drawerProps: createDrawerProps,
        formProps: createFormProps,
        saveButtonProps: createSaveButtonProps,
        show: createShow,
    } = useDrawerForm<ICliente, HttpError, ICliente>({
        action: "create",
        resource: "clientes",
        redirect: false,
    });

    const {
        drawerProps: editDrawerProps,
        formProps: editFormProps,
        saveButtonProps: editSaveButtonProps,
        show: editShow,
    } = useDrawerForm<ICliente, HttpError, ICliente>({
        action: "edit",
        resource: "clientes",
        redirect: false,
    });

    return (
        <>
            <List
                headerProps={{
                    extra: <CreateButton onClick={() => createShow()} />,
                }}
            >
                <AntdList
                    grid={{ gutter: 24, xs: 1 }}
                    {...listProps}
                    renderItem={(item) => (
                        <AntdList.Item>
                            <ClienteItem item={item} editShow={editShow} />
                        </AntdList.Item>
                    )}
                />
            </List>
            <CreateCliente
                drawerProps={createDrawerProps}
                formProps={createFormProps}
                saveButtonProps={createSaveButtonProps}
            />
            <EditCliente
                drawerProps={editDrawerProps}
                formProps={editFormProps}
                saveButtonProps={editSaveButtonProps}
            />
        </>
    );
};
