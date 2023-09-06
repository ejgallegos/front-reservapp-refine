import { IResourceComponentsProps, HttpError } from "@refinedev/core";
import { useSimpleList, List, useModalForm } from "@refinedev/antd";
import { List as AntdList } from "antd";

import { IAlojamiento } from "../../interfaces";
import {
    AlojamientoItem,
    CreateAlojamiento,
    EditAlojamiento,
} from "../../components/alojamiento";

export const AlojamientoList: React.FC<IResourceComponentsProps> = () => {
    const //`useSimpleList` does not accept all of Ant Design's `List` component props anymore. You can directly use `List` component instead.,
        { listProps } = useSimpleList<IAlojamiento>({
            // meta: { populate: ["imagen"] },
        });

    const {
        modalProps: createModalProps,
        formProps: createFormProps,
        show: createShow,
    } = useModalForm<IAlojamiento, HttpError, IAlojamiento>({
        action: "create",
        // meta: { populate: ["imagen"] },
    });

    const {
        modalProps: editModalProps,
        formProps: editFormProps,
        show: editShow,
    } = useModalForm<IAlojamiento, HttpError, IAlojamiento>({
        action: "edit",
        // meta: { populate: ["imagen"] },
    });

    return (
        <>
            <List
                createButtonProps={{
                    onClick: () => {
                        createShow();
                    },
                }}
            >
                <AntdList
                    grid={{ gutter: 16 }}
                    {...listProps}
                    renderItem={(item) => (
                        <AntdList.Item>
                            <AlojamientoItem item={item} editShow={editShow} />
                        </AntdList.Item>
                    )}
                />
            </List>
            <CreateAlojamiento
                modalProps={createModalProps}
                formProps={createFormProps}
            />
            <EditAlojamiento
                modalProps={editModalProps}
                formProps={editFormProps}
            />
        </>
    );
};
