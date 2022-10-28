import React, { useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import L from 'leaflet';
import { Modal } from 'react-bootstrap';
import { useEffect } from 'react';
import { dumpApi } from '../http/dumpApi';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Main = () => {
    const [dumps, setDumps] = useState([]);
    useEffect(() => {
        dumpApi.getCurrent().then(data => {
            setDumps(data);
            console.log(data);
        })
    }, [])
    const [modalOpen, setModalOpen] = useState(false);
    const [dumpId, setDumpId] = useState(false);

    const handleModalOpen = (id) => {
        setModalOpen(true);
        setDumpId(id);
        console.log('qweqwe')
    }

    return (
        <div className='Main'>
            <div className='Container'>
                <div className='mb-4' style={{ fontSize: '20pt' }}>
                    <h1 style={{ color: '#1a6c16', fontSize: '48pt' }}>Главная</h1>
                    На карте обозначены незаконные свалки, вы можете прислать информацию о незаконной свалке, которую вы обнаружили!
                    <br />
                    После того, как ваша заявка пройдет модерацию, все узнают о незаконной свалке
                </div>

                <MapContainer center={[54.514635, 36.252962]} zoom={16} scrollWheelZoom={true}>
                    {dumps.map(dump =>
                        <Marker
                            key={dump.id}
                            position={[Number(dump.latitude), Number(dump.longitude)]}
                            eventHandlers={{
                                click: () => handleModalOpen(dump.id),
                            }}
                        >
                        </Marker>
                    )}
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
                {modalOpen &&
                    <Modal onHide={() => setModalOpen(false)} show={true}>
                        <div className='p-4'>
                            {dumps.find(dump => dump.id === dumpId).description}
                            <br />
                            <img style={{ width: '100%' }} src={'https://losharik1713.pythonanywhere.com/' + dumps.find(dump => dump.id === dumpId).img_url} className='mt-3' />
                        </div>
                    </Modal>
                }
                <div className='mt-4' style={{ fontSize: '20pt' }}>
                    Отмечая незаконные свалки, вы вносите большой вклад в благоустройство Калужской области!
                </div>
            </div>

        </div>
    )
}

export default Main