import { Descriptions, PageHeader } from "antd";
import { FC } from "react";
import React, { useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import { useNavigation } from "../micro/useMicro";

interface PDetailView{

}


  

const DetailView:FC<PDetailView> = function(props:PDetailView){
  const {viewPath,naviagtorName} = useNavigation()
   return (
    <PageHeader
    className="site-page-header"
    onBack={() => naviagtorName("demo.list")}
    title="详情页"
    subTitle="详细信息"
  >
      <Descriptions title="User Info">
        <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
        <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
        <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
        <Descriptions.Item label="Remark">empty</Descriptions.Item>
        <Descriptions.Item label="Address">
        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
        </Descriptions.Item>
    </Descriptions>
  </PageHeader>
   ) 
}

export default DetailView