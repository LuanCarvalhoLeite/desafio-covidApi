import { PageHeader, Tabs, Collapse, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import api from '../services/api';
import "./Info-style.css";

const {TabPane} = Tabs;
const {Panel} = Collapse;

const Info = () => {
    const [title, setTitle] = useState("");
    const [casos, setCasos] = useState({});
    const [vacinas, setVacinas] = useState({});

    const [loadingCasos, setLoadingCasos] = useState(false);
    const [loadingVacinas, setLoadingVacinas] = useState(false);

    const history = useHistory();
    const params = useParams();

    async function getCasos() {
        if (Object.keys(casos).length === 0) {
            setLoadingCasos(true);
            const resp = await api.get(`/cases?country=${params.pais}`)
            if (resp.status === 200) {
                setCasos(resp.data);
            }
            setLoadingCasos(false);
        }
    }

    async function getVacinacao() {
        setLoadingVacinas(true);
        const resp = await api.get(`/vaccines?country=${params.pais}`);
        if (resp.status === 200) {
            setVacinas(resp.data);
        }
        setLoadingVacinas(false);
    }

    function onChangeTab(activeKey) {
        if (activeKey === "1") getCasos(); 
        if (activeKey === "2") getVacinacao(); 
    }

    useEffect(() => {
        getCasos();
    }, [])

    useEffect(() => {
        if (params.pais) {
            setTitle(params.pais);
        }
    }, [params])

    return <div>
        <PageHeader className="site-page-header" onBack={() => history.goBack()} title={title} subTitle="Informação de casos e vascinação"/>

        <Tabs onChange={onChangeTab} defaultActiveKey="1" style={{ margin: 32 }}>
          <TabPane tab="Casos" key="1" style={{minHeight: 100}}>
              <Spin spinning={loadingCasos}>
                <Collapse defaultActiveKey={[]}>
                    {Object.keys(casos).map((item, index) => {
                    const obj = casos[item];
                    return <Panel header={item} key={index}>
                        <p>
                            <b>Confirmados: </b> {obj.confirmed}
                        </p>
                        <p>
                            <b>Recuperados: </b> {obj.recovered}
                        </p>
                        <p>
                            <b>Confirmados: </b> {obj.deaths}
                        </p>
                    </Panel>;
                })}   
                </Collapse>
            </Spin>
          </TabPane>
          <TabPane tab="Vacinação" key="2" style={{minHeight: 100}}> 
            <Spin spinning={loadingVacinas}>
                <Collapse defaultActiveKey={["0"]}>
                    {Object.keys(vacinas).map((item, index) => {
                    const obj = vacinas[item];
                    return <Panel header={item} key={index}>
                        <p>
                            <b>População: </b> {obj.population}
                        </p>
                        <p>
                            <b>Expectativa de Vida: </b> {obj.life_expectancy}
                        </p>
                        <p>
                            <b>Pessoas Vacinadas: </b> {obj.people_vaccinated}
                        </p>
                        <p>
                            <b>Pessoas Parcialmente Vacinadas: </b> {obj.people_partially_vaccinated}
                        </p>
                    </Panel>;
                })}   
                </Collapse>
            </Spin>
          </TabPane>
        </Tabs>
    </div>
};
export default Info;