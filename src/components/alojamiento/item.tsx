import {
    DeleteButton,
    UrlField,
    EmailField,
    EditButton,
} from "@refinedev/antd";
import { Card, Typography } from "antd";

import { IAlojamiento } from "../../interfaces";
import { API_URL } from "../../constants";

const { Title, Text, Paragraph } = Typography;

type AlojamientoItemProps = {
    item: IAlojamiento;
    editShow: (id?: string | undefined) => void;
};

export const AlojamientoItem: React.FC<AlojamientoItemProps> = ({ item, editShow }) => {
    const image = item.imagen ? item.imagen : "./error.png";

    return (
        <Card
            style={{ width: "300px" }}
            cover={
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                        style={{
                            width: 270,
                            height: 220,
                            padding: 24,
                        }}
                        src={image}
                        alt="logo"
                    />
                </div>
            }
            actions={[
                <EditButton
                    key="edit"
                    size="small"
                    hideText
                    onClick={() => editShow(`${item.id}`)}
                />,
                <DeleteButton
                    key="delete"
                    size="small"
                    hideText
                    recordItemId={item.id}
                />,
            ]}
        >
            <Title level={5}>Nombre:</Title>
            <Text>{item.denominacion}</Text>
            <Title level={5}>E-mail:</Title>
            <Text>{item.email}</Text>
            <Title level={5}>Teléfono:</Title>
            <Text>{item.telefono}</Text>
            <Title level={5}>Capacidad:</Title>
            <Text>{item.capacidad} - Personas</Text>
            <Title level={5}>Descripción:</Title>
            <Paragraph>{item.descripcion}</Paragraph>
            {/* <Text>{item.city}</Text>
            <Title level={5}>Email:</Title>
            <EmailField value={item.email} />
            <Title level={5}>Website:</Title>
            <UrlField value={item.website} /> */}
        </Card>
    );
};
