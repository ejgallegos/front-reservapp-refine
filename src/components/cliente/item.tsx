import { useDelete } from "@refinedev/core";
import { TagField } from "@refinedev/antd";

import * as Icons from "@ant-design/icons";

import { Card, Typography, Dropdown, Menu } from "antd";
import type { MenuProps } from 'antd';

import { ICliente } from "../../interfaces";

const { FormOutlined, DeleteOutlined, WhatsAppOutlined, MailOutlined } = Icons;
const { Title, Text } = Typography;

type ClienteItemProps = {
    item: ICliente;
    editShow: (id?: number | undefined) => void;
};

export const ClienteItem: React.FC<ClienteItemProps> = ({ item, editShow }) => {
    const { mutate } = useDelete();

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <a onClick={() => editShow(item.id)}>
                <FormOutlined
                    style={{
                        color: "green",
                    }}
                /> Editar</a>
        },
    ];


    return (
        <Card style={{ width: 300, height: 250, borderColor: "black" }}>
            <div style={{ position: "absolute", top: "10px", right: "5px" }}>
                <Dropdown
                    menu={{ items }}
                    trigger={["click"]}
                >
                    <Icons.MoreOutlined
                        style={{
                            fontSize: 24,
                        }}
                    />
                </Dropdown>
            </div>

            <Title level={4}>{item.denominacion}</Title>
            <Title level={5}>Teléfono:</Title>
            <TagField icon={<WhatsAppOutlined />} color={"#075E54"} value={item.telefono} />
            <Title level={5}>E-mail:</Title>
            <TagField
                icon={<MailOutlined />}
                color={"#673ab7"}
                value={item.email}
            />
        </Card>
    );
};
