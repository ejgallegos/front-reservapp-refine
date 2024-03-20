import { useMany, HttpError, CrudFilters } from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import "dayjs/locale/es";
import locale from "antd/es/date-picker/locale/es_ES";
import {
    List,
    useTable,
    TagField,
    useModalForm,
    EditButton,
    DeleteButton,
    TextField,
    DateField,
    RefreshButton,
} from "@refinedev/antd";
import { Button, Card, Col, Form, Input, Table, DatePicker, Space, Collapse, Divider, Select } from "antd";
const { RangePicker } = DatePicker;

import { IReserva, ICliente, IAlojamiento, IReservaFilterVariables } from "../../interfaces";
import { CreateReserva, EditReserva, ApproveReserva } from "../../components/reserva";
import { CheckSquareOutlined, WhatsAppOutlined } from "@ant-design/icons";

export const ReservaOtaList: React.FC = () => {
    const navigate = useNavigate();
    const { tableProps, searchFormProps } = useTable<IReserva, HttpError, IReservaFilterVariables>({
        sorters: {
            initial: [
                {
                    field: "id",
                    order: "desc",
                },
            ],
        },
        metaData: {
            populate: "*",
        },
        onSearch: (params) => {
            const filters: CrudFilters = [];
            const { cliente, fecha, estado } = params;

            filters.push(
                {
                    field: "cliente.denominacion",
                    operator: "containss",
                    value: cliente,
                },
                {
                    field: "fechaDesde",
                    operator: "gte",
                    value: fecha ? fecha[0].toISOString() : undefined,
                },
                {
                    field: "fechaHasta",
                    operator: "lte",
                    value: fecha ? fecha[1].toISOString() : undefined,
                },
                {
                    field: "estado",
                    operator: "containss",
                    value: estado,
                }
            );
            return filters;
        },
    });
    const { formProps, modalProps, show } = useModalForm({
        resource: "reservas",
        action: "create",
        metaData: {
            populate: "*",
        }
    });

    const {
        formProps: approveFormProps,
        modalProps: approveModalProps,
        show: approveShow,
    } = useModalForm({
        resource: "reservas",
        action: "edit",
        metaData: {
            populate: "*",
        }
    });

    const {
        formProps: editFormProps,
        modalProps: editModalProps,
        show: editShow,
    } = useModalForm({
        resource: "reservas",
        action: "edit",
        metaData: {
            populate: "*",
        }
    });

    const clientesIds =
        tableProps?.dataSource?.map((item) => item.cliente?.id) ?? [];
    const { data: clientesData } = useMany<ICliente, HttpError>({
        resource: "clientes",
        ids: clientesIds,
        queryOptions: {
            enabled: clientesIds.length > 0,
        },
    });

    const alojamientosIds =
        tableProps?.dataSource?.map((item) => item.alojamiento?.id) ?? [];
    const { data: alojamientosData } = useMany<IAlojamiento, HttpError>({
        resource: "alojamientos",
        ids: alojamientosIds,
        queryOptions: {
            enabled: alojamientosIds.length > 0,
        },
    });


    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    // if (isError) {
    //     return <div>Something went wrong!</div>;
    // }

    const handleRefresh = () => {
        window.location.href = "/reservas";
    };

    const handleSendWA = (value: number) => {

        const client = clientesData?.data.find((item) => item.telefono === value);
        const msjText = `Hola ${client?.denominacion}, soy tu agente a cargo.\nTe informo que tu Reserva a sido *Aprobada*`;

        window.open(`https://api.whatsapp.com/send/?phone=${client?.telefono}&text=${msjText}&type=phone_number&app_absent=1`, "_blank");
    };

    return (
        <>
            <Collapse
                items={[{
                    key: "1",
                    label: "Filtros",
                    children:
                        <Card>
                            <Col lg={24} xs={24}>
                                <Form layout='vertical' {...searchFormProps}>
                                    <Form.Item name='cliente'>
                                        <Input
                                            placeholder='Nombre Cliente'
                                        />
                                    </Form.Item>
                                    <Form.Item name='estado'>
                                        <Select showSearch allowClear placeholder='Estado' options={[
                                            {
                                                label: "Pendiente",
                                                value: "Pendiente"
                                            },
                                            {
                                                label: "Aprobado",
                                                value: "Aprobado"
                                            },
                                            {
                                                label: "Rechazado",
                                                value: "Rechazado"
                                            }]} />
                                    </Form.Item>
                                    <Form.Item name='fecha'>
                                        <RangePicker locale={locale} />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button htmlType='submit' type='primary'>
                                            Buscar
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Card>
                }]}
            />
            <Divider />

            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <List
                    resource="reservas"
                    createButtonProps={{
                        onClick: () => {
                            show();
                        },
                    }}
                    headerButtons={({ defaultButtons }) => (
                        <>
                            {defaultButtons}
                            <RefreshButton onClick={handleRefresh} />
                        </>
                    )}>


                    <Table {...tableProps}
                        rowKey="id">
                        <Table.Column key="id" dataIndex="id" title="ID" />
                        <Table.Column
                            key='[cliente][id]'
                            dataIndex={["cliente", "id"]}
                            title='Cliente'
                            render={(value) => {
                                return (
                                    <TextField
                                        value={
                                            clientesData?.data.find(
                                                (item) => item.id === value
                                            )?.denominacion
                                        }
                                    />
                                );
                            }}
                        />
                        <Table.Column
                            key='[alojamiento][id]'
                            dataIndex={["alojamiento", "id"]}
                            title='Alojamiento'
                            render={(value) => {
                                return (
                                    <TextField
                                        value={
                                            alojamientosData?.data.find(
                                                (item) => item.id === value
                                            )?.denominacion
                                        }
                                    />
                                );
                            }}
                        />
                        <Table.Column
                            dataIndex='fechaDesde'
                            key='fechaDesde'
                            title='Fecha Inicio'
                            render={(value) => (
                                <DateField
                                    locales='es'
                                    value={value}
                                    format='dddd LL'
                                />
                            )}
                        />
                        <Table.Column
                            dataIndex='fechaHasta'
                            key='fechaHasta'
                            title='Fecha Fin'
                            render={(value) => (
                                <DateField
                                    locales='es'
                                    value={value}
                                    format='dddd LL'
                                />
                            )}
                        />
                        <Table.Column
                            dataIndex='fechaReserva'
                            key='fechaReserva'
                            title='Fecha Reserva'
                            render={(value) => (
                                <DateField
                                    locales='es'
                                    value={value}
                                    format='DD-MM-YYYY'
                                />
                            )}
                        />
                        <Table.Column
                            dataIndex="estado"
                            title="Estado"
                            render={(value) => (
                                <TagField value={value} color={(value === 'Pendiente') ? 'yellow' : (value === 'Aprobado') ? 'blue' : 'red'}
                                />
                            )}

                        />
                        <Table.Column
                            key="[cliente][telefono]"
                            dataIndex={["cliente", "telefono"]}
                            title="Teléfono"
                            render={(value) => (
                                <TagField
                                    title="Comunicarse por WhatsApp"
                                    value={
                                        clientesData?.data.find(
                                            (item) => item.telefono === value
                                        )?.telefono
                                    }
                                    color={"green"}
                                    onClick={() => { handleSendWA(value) }}
                                    icon={<WhatsAppOutlined />}
                                    style={{ cursor: 'pointer' }}
                                />
                            )}

                        />
                        {/* <Table.Column<IReserva>
                        title="Total"
                        render={(_, record) => {
                            return (
                                <TagField
                                    value={`${record?.daily_rate * record?.day
                                        } $`}
                                    color="green"
                                />
                            );
                        }}
                    /> */}
                        <Table.Column<IReserva>
                            title="Acciones"
                            dataIndex="id"
                            key="actions"
                            render={(_value, record) => (
                                <Space>
                                    <Button
                                        title="Aprobar"
                                        size="small"
                                        icon={<CheckSquareOutlined style={{
                                            color: "blue",
                                        }} />}
                                        onClick={() => approveShow(record?.id)}
                                    />
                                    <EditButton
                                        title="Editar"
                                        hideText
                                        size="small"
                                        recordItemId={record?.id}
                                        onClick={() => editShow(record?.id)}
                                    />
                                    <DeleteButton
                                        title="Eliminar"
                                        hideText
                                        size="small"
                                        recordItemId={record?.id}
                                    />
                                </Space>
                            )}
                        />
                    </Table>
                </List>

                <CreateReserva
                    modalProps={modalProps}
                    formProps={formProps}
                />
                <EditReserva
                    modalProps={editModalProps}
                    formProps={editFormProps}
                />
                <ApproveReserva
                    modalProps={approveModalProps}
                    formProps={approveFormProps}
                />
            </Space >
        </>
    );
};
