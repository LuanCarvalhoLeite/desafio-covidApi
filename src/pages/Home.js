import { Breadcrumb, Menu, Select, Form, Button, Row, Col, Divider } from 'antd';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';


const Home = () => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [paises, setPaises] = useState([]);
    const history = useHistory();


    async function getPaises() {
        setLoading(true);
        const resp = await api.get("/cases");
        if (resp.status === 200) {
            console.log(resp.data);
            setPaises(Object.keys(resp.data));
        }
        setLoading(false)
    }

    function selecionarPais() {
        form.validateFields().then((values) => {
            console.log(values);
            history.push(`${values.pais}`);
        })   
    } 
    function onFinish(values) {
        console.log(values);
        history.push(`${values.pais}`);
    }

    useEffect (() => {
        getPaises();
    }, []);

    return (
        <div>
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%', backgroundColor: '#B22222' }}></Header>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64, backgroundColor: "#FFF0F5" }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                </Breadcrumb>
                <Divider>International Cases</Divider>
                <div className="site-layout-background" style={{ padding: 24 }}>
                    <Form initialValues={{pais: "Brazil"}} onFinish={onFinish} form={form}>
                        <Row sm={20}>
                            <Col sm={12}>
                            <Form.Item name="pais" rules={[{ required: true, message:"Campo obrigatório!" }]}>
                                <Select className="search" onChange={selecionarPais} placeholder="Selecione o país..." loading={loading}>
                                    {/* <Select.Option>Selecione</Select.Option> */}
                                    {paises.map((pais) => (
                                        <Select.Option key={pais} value={pais}>{pais}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            </Col>
                            <Col sm={4}>
                            <Button htmlType="submit">Selecione</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Content>
        </Layout>
        </div>
    )
};
export default Home;