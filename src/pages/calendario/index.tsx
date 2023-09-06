import { useState } from 'react';
import { IResourceComponentsProps, useList } from "@refinedev/core";

import { Show } from "@refinedev/antd";
import { Alert, Badge, BadgeProps, Calendar, Modal, Space } from "antd";
import { CalendarMode } from "antd/lib/calendar/generateCalendar";

import dayjs from "dayjs";
import "dayjs/locale/es";
import locale from "antd/es/date-picker/locale/es_ES";

import { IReserva } from "../../interfaces";

import "./index.css";

export const CalendarPage: React.FC<IResourceComponentsProps> = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReservas, setSelectedReservas] = useState<IReserva[]>([]);

    const showReservasModal = (reservas: IReserva[]) => {
        setSelectedReservas(reservas);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const { data } = useList<IReserva>({
        resource: "reservas",
        config: {
            pagination: {
                pageSize: 100,
            },
        },
        metaData: {
            populate: "*",
        }
    });

    const monthCellRender = (value: dayjs.Dayjs) => {
        const listData =
            data?.data?.filter((p) => dayjs(p.fechaDesde).isSame(value, "month")) ??
            [];
        return listData.length > 0 ? (
            <div className="notes-month">
                <section>{listData.length}</section>
                <span>Reservas</span>
            </div>
        ) : null;
    };

    const panelChange = (value: dayjs.Dayjs, mode: CalendarMode) => {
        console.log(value.format("DD-MM-YYYY"), mode);
    };

    const dateCellRender = (value: dayjs.Dayjs) => {
        const listData = data?.data?.filter((p) =>
            dayjs(p.fechaDesde).isSame(value, "day"),
        );
        return (
            <ul className="events">
                {listData?.map((item) => {
                    if (item.estado == "Aprobado") {
                        return (
                            <li key={item.id} onClick={() => showReservasModal(listData)}>
                                <Badge status="success" text={`${item.alojamiento.denominacion} - ${item.cliente.denominacion}`} />
                            </li>
                        )
                    }
                }
                )}
            </ul>
        );
    };

    return (
        <>
            <Calendar
                style={{ zIndex: 0 }}
                locale={locale}
                onPanelChange={panelChange}
                dateCellRender={dateCellRender}
                monthCellRender={monthCellRender}
            />
            <Modal title="Reservas"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}>
                <>
                    {selectedReservas.map((item) => (
                        <Space direction="vertical" size="middle" style={{ width: '100%', display: 'flex', padding: '3px' }}>
                            <Alert
                                message={`${item.alojamiento.denominacion} - ${item.cliente.denominacion}`}
                                description={`Fecha Desde: ${dayjs(item.fechaDesde).format('DD-MM-YYYY')} | Fecha Hasta: ${dayjs(item.fechaHasta).format('DD-MM-YYYY')}`}
                                type="success"
                                showIcon
                            />
                        </Space>
                    ))}
                </>
            </Modal>
        </>
    );
};
