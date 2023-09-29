import React, { useState } from 'react';
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

import dayjs from "dayjs";

import { IReserva } from "../../interfaces";
import { useList } from '@refinedev/core';

import { Alert, Card, Divider, Modal, Space } from 'antd';
import "./index.css";

import {
    CalendarOutlined,
    ClockCircleOutlined,
    CloseOutlined,
    EditOutlined,
    FlagOutlined,
    InfoCircleOutlined,
    HomeOutlined,
    TeamOutlined,
} from "@ant-design/icons";

export function FullCalendario() {

    interface EventObject {
        title: string;
        start: string;
        end: string;
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReservas, setSelectedReservas] = useState<EventObject[]>([]);

    const showReservasModal = (res: EventObject[]) => {
        setSelectedReservas(res);
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


    const reservas: EventObject[] = (data?.data || []).map(item => {
        if (item.estado === 'Aprobado') {
            return ({
                id: item.id,
                title: `${item.alojamiento.denominacion} - ${item.cliente.denominacion}`,
                start: dayjs(`${item.fechaDesde} 12:30:00`).format(),
                end: dayjs(`${item.fechaHasta} 10:30:00`).format(),
                color: item.alojamiento.color,
                //textColor: 'black'
            });
        }
    }).filter(Boolean) as EventObject[];

    return (
        <>
            <Card bordered={false} className="events">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                    initialView="dayGridMonth"
                    weekends={true}
                    events={reservas}
                    eventTimeFormat={{
                        hour: "2-digit",
                        minute: "2-digit",
                        meridiem: false,
                    }}
                    eventClick={(info) => {
                        const clickedEvent = info.event;

                        const eventObject: EventObject = {
                            title: clickedEvent.title,
                            start: clickedEvent.startStr,
                            end: clickedEvent.endStr,
                        };

                        showReservasModal([eventObject]);
                    }}
                    //headerToolbar={{ start: 'title', center: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth', end: 'prev,next' }}
                    headerToolbar={{ start: 'title', end: 'prev,next' }}
                    timeZone="UTC-3"
                    height={1200}
                    locale='es'
                />
            </Card>
            <Modal title="Detalles de la Reserva"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}>
                <>
                    {selectedReservas.map((item) => {
                        const alojamiento = item.title.split(' - ')[0];
                        const cliente = item.title.split(' - ')[1];
                        return (
                            <Space direction="vertical" size="middle" style={{ width: '100%', display: 'flex', padding: '3px' }}>
                                {/* <Alert
                                message={`${item.title}`}
                                description={`Fecha Desde: ${dayjs(item.start).format('DD-MM-YYYY')}
                                \nCheck In: 12:30 Hs.
                                \nFecha Hasta: ${dayjs(item.end).format('DD-MM-YYYY')} 
                                \nCheck Out: 10:30 Hs.`}
                                type="success"
                                showIcon
                            /> */}
                                <Card size="small"
                                    title={''}
                                    bordered={false} >
                                    <p>
                                        <HomeOutlined style={{ marginRight: ".5rem" }} />
                                        <b>Alojamiento:</b> {alojamiento}
                                    </p>
                                    <p>
                                        <TeamOutlined style={{ marginRight: ".5rem" }} />
                                        <b>Cliente:</b> {cliente}
                                    </p>
                                    <Divider />
                                    <p><CalendarOutlined
                                        style={{ marginRight: ".5rem" }}
                                    /><b>Fecha Desde:</b> {dayjs(item.start).format('DD-MM-YYYY')}</p>
                                    <p><ClockCircleOutlined
                                        style={{ marginRight: ".5rem" }}
                                    /><b>Check In:</b> 12:30 Hs.</p>
                                    <p><CalendarOutlined
                                        style={{ marginRight: ".5rem" }}
                                    /><b>Fecha Hasta:</b> {dayjs(item.end).format('DD-MM-YYYY')}</p>
                                    <p><ClockCircleOutlined
                                        style={{ marginRight: ".5rem" }}
                                    /><b>Check Out:</b> 10:30 Hs.</p>
                                </Card>
                            </Space>
                        )
                    })}
                </>
            </Modal>
        </>
    )

}