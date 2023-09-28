import React, { useState } from 'react';
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

import dayjs from "dayjs";

import { IReserva } from "../../interfaces";
import { useList } from '@refinedev/core';

import { Alert, Card, Modal, Space } from 'antd';
import "./index.css";

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
                start: dayjs(`${item.fechaDesde} 10:30:00`).format(),
                end: dayjs(`${item.fechaHasta} 14:30:00`).format(),
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
                    {selectedReservas.map((item) => (
                        <Space direction="vertical" size="middle" style={{ width: '100%', display: 'flex', padding: '3px' }}>
                            {/* <Alert
                                message={`${item.title}`}
                                description={`Fecha Desde: ${dayjs(item.start).format('DD-MM-YYYY')}
                                \nCheck In: 10:30 Hs.
                                \nFecha Hasta: ${dayjs(item.end).format('DD-MM-YYYY')} 
                                \nCheck Out: 14:30 Hs.`}
                                type="success"
                                showIcon
                            /> */}
                            <Card size="small" title={item.title} bordered={false} >
                                <p>Fecha Desde: {dayjs(item.start).format('DD-MM-YYYY')}</p>
                                <p>Check In: 10:30 Hs.</p>
                                <p>Fecha Hasta: {dayjs(item.end).format('DD-MM-YYYY')}</p>
                                <p>Check Out: 14:30 Hs.</p>
                            </Card>
                        </Space>
                    ))}
                </>
            </Modal>
        </>
    )

}