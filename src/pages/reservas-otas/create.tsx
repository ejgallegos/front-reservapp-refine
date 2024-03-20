import React, { useState } from "react";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";

import dayjs from "dayjs";

import "dayjs/locale/es";
import locale from "antd/es/date-picker/locale/es_ES";

import { useSelect } from "@refinedev/antd";
import {
  Form,
  ModalProps,
  FormProps,
  Modal,
  Select,
  DatePicker,
  Button,
} from "antd";
import type { DatePickerProps, GetProps } from "antd";

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const { RangePicker } = DatePicker;

import { useList } from "@refinedev/core";
import { IAlojamiento, IReserva } from "../../interfaces";

const dateFormat = "YYYY-MM-DD";
const dateNow = dayjs().format(dateFormat);

type CreateReservaProps = {
  formProps: FormProps;
};
let randoFechas:any;

export const ReservaOtaCreate: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { formProps, saveButtonProps, queryResult, onFinish } = useForm();

  const { selectProps: clientes } = useSelect({
    resource: "clientes",
    optionValue: "id",
    optionLabel: "denominacion",
  });
  
  const { selectProps: alojamientos } = useSelect({
    resource: "alojamientos",
    optionValue: "id",
    optionLabel: "denominacion",
  });


  const { form } = formProps;
  
  const onReset = () => {
    form?.resetFields();
  };

  
  const onChange = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    console.log({value, dateString});
    randoFechas = dateString;
  };

  const handleOnFinish = (values: any) => {
    console.log({ values });
    console.log({ randoFechas });
    onFinish({
      alojamiento: values.alojamiento,
      estado: "Aprobado",
      cliente: 10,
      telefono: 0,
      fechaReserva: dateNow,
      fechaDesde: randoFechas[0],
      fechaHasta: randoFechas[1],
    });
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={handleOnFinish}>
        <Form.Item name="fecha">
          <RangePicker
            format="YYYY-MM-DD"
            locale={locale}
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item
          label="Alojamiento"
          name="alojamiento"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Select
            //disabled={disabledSelect}
            {...alojamientos}
            // showSearch
            placeholder="Seleccione Alojamiento"
          >  
          </Select>
        </Form.Item>
      </Form>
    </Create>
  );
};
