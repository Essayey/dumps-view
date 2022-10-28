import { Handler } from 'leaflet';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { dumpApi } from '../http/dumpApi';

const Admin = () => {
    const [selected, setSelected] = useState(null);
    const [isCurrentShow, setIsCurrentShow] = useState(false);
    const [isNewShow, setIsNewShow] = useState(true);
    const [isDoneShow, setIsDoneShow] = useState(false);

    const [dumpsCurrent, setDumpsCurrent] = useState([])
    const [dumpsNew, setDumpsNew] = useState([])
    const [dumpsDone, setDumpsDone] = useState([])

    useEffect(() => {
        dumpApi.getAll().then(data => {
            console.log(data);
            setDumpsNew(data.filter(data => data.status === 0));
            setDumpsCurrent(data.filter(data => data.status === 1));
            setDumpsDone(data.filter(data => data.status === 2));
        })
    }, [])

    const handleConfirm = (id) => {
        dumpApi.setConfirm(id).then(() => {
            dumpApi.getAll().then(data => {
                setDumpsNew(data.filter(data => data.status === 0));
                setDumpsCurrent(data.filter(data => data.status === 1));
                setDumpsDone(data.filter(data => data.status === 2));
            })
        })
    }
    const handleDone = (id) => {
        dumpApi.setDone(id).then(() => {
            dumpApi.getAll().then(data => {
                setDumpsNew(data.filter(data => data.status === 0));
                setDumpsCurrent(data.filter(data => data.status === 1));
                setDumpsDone(data.filter(data => data.status === 2));
            })
        })
    }
    const handleDelete = (id) => {
        dumpApi.delete(id)
            .then(() => dumpApi.getAll())
            .then(data => {
                setDumpsNew(data.filter(data => data.status === 0));
                setDumpsCurrent(data.filter(data => data.status === 1));
                setDumpsDone(data.filter(data => data.status === 2));
            })
    }

    return (
        <div>
            <div className='Container'>
                <h1 style={{ color: '#1a6c16', fontSize: '48pt' }}>Админ панель</h1>
                <Form>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        checked={isNewShow}
                        onChange={() => setIsNewShow(value => !value)}
                        label="Показать неподтвержденные свалки"
                    />
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        checked={isCurrentShow}
                        onChange={() => setIsCurrentShow(value => !value)}
                        label="Показать текущие свалки"
                    />
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        checked={isDoneShow}
                        onChange={() => setIsDoneShow(value => !value)}
                        label="Показать решенные свалки"
                    />
                </Form>
                <MapContainer center={[54.514635, 36.252962]} zoom={16} scrollWheelZoom={true}>
                    {isDoneShow && dumpsDone.map(dump =>
                        <Marker
                            key={dump.id}
                            position={[Number(dump.latitude), Number(dump.longitude)]}
                        >
                            <Popup >
                                <div style={{ width: 250 }}>
                                    {dump.description}
                                    <br />
                                    <img
                                        src={'https://losharik1713.pythonanywhere.com/' + dump.img_url} style={{ width: 200, height: 200 }} />
                                    <div className='d-flex justify-content-between'>
                                        <Button
                                            className="mt-3"
                                            variant='danger'
                                            onClick={() => handleDelete(dump.id)}
                                        >
                                            Удалить
                                        </Button>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    )}
                    {isCurrentShow && dumpsCurrent.map(dump =>
                        <Marker
                            key={dump.id}
                            position={[Number(dump.latitude), Number(dump.longitude)]}
                        >
                            <Popup >
                                <div style={{ maxWidth: 250 }}>
                                    {dump.description}
                                    <br />
                                    <img src={'https://losharik1713.pythonanywhere.com/' + dump.img_url} style={{ width: 200, height: 200 }} />
                                    <div className='d-flex justify-content-between'>
                                        <Button
                                            className="mt-3"
                                            variant='danger'
                                            onClick={() => handleDelete(dump.id)}
                                        >
                                            Удалить
                                        </Button>
                                        <Button
                                            onClick={() => handleDone(dump.id)}
                                            className="mt-3"
                                        >
                                            Решить
                                        </Button>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    )}

                    {isNewShow && dumpsNew.map(dump =>
                        <Marker
                            key={dump.id}
                            position={[Number(dump.latitude), Number(dump.longitude)]}
                        >
                            <Popup >
                                <div style={{ maxWidth: 250 }}>
                                    {dump.description}
                                    <br />
                                    <img src={'https://losharik1713.pythonanywhere.com/' + dump.img_url} style={{ width: 200, height: 200 }} />
                                    <div className='d-flex justify-content-between'>
                                        <Button
                                            className="mt-3"
                                            variant='danger'
                                            onClick={() => handleDelete(dump.id)}
                                        >
                                            Удалить
                                        </Button>
                                        <Button
                                            onClick={() => handleConfirm(dump.id)}
                                            className="mt-3"

                                        >
                                            Подтвердить
                                        </Button>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    )}

                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </div>
        </div>
    )
}

export default Admin