import React, { useRef, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { useEffect } from 'react'
import { resizeTextArea } from '../utils/resizeTextArea'
import { dumpApi } from '../http/dumpApi'

const Locate = ({ setPosition }) => {
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng)
        },
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })


    return null;
}

const AddDump = () => {
    const mapRef = useRef();
    const markerRef = useRef();

    const [position, setPosition] = useState(null);
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);

    const addDump = e => {
        e.preventDefault();

        if (!position) return;
        if (e.target.checkValidity() === false) {
            e.stopPropagation();
        }

        const formData = new FormData();
        formData.append('lat', String(position.lat));
        formData.append('lng', String(position.lng));
        if (description) formData.append('description', description);
        if (file) formData.append('photo', file);
        dumpApi.addDump(formData);
        console.log(formData);
        // Request
    }

    // resize textarea
    const textareaRef = useRef();
    useEffect(() => {
        resizeTextArea(textareaRef)
    }, [description])

    return (
        <div className='AddDump'>
            <div className='Container'>
                <h1 style={{ color: '#1a6c16', fontSize: '48pt' }}>Отправить информацию о незаконной свалке</h1>
                <div style={{ fontSize: '20pt' }}>Местоположение свалки</div>
                <MapContainer
                    ref={mapRef}
                    center={[54.514635, 36.252962]}
                    zoom={16}
                    scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        position &&
                        <Marker
                            ref={markerRef}
                            draggable={true}
                            position={[position.lat, position.lng]}
                            eventHandlers={
                                {
                                    dragend(e) {
                                        setPosition(markerRef.current.getLatLng())
                                    }
                                }
                            }
                        >

                        </Marker>
                    }

                    <Locate setPosition={setPosition} />
                </MapContainer>
                <div className='d-flex flex-row-reverse mt-3'>
                    <Button style={{ background: '#3aaa35' }} onClick={() => mapRef.current.locate()}>
                        Найти меня на карте
                    </Button>
                </div>

                <div style={{ fontSize: '20pt', color: '#1a6c16', fontWeight: 500 }}>Описание</div>

                <Form onSubmit={addDump}>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm="12">
                            <Form.Control
                                required
                                style={{ resize: 'none !important' }}
                                as='textarea'
                                ref={textareaRef}
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <div style={{ fontSize: '20pt', color: '#1a6c16', fontWeight: 500 }}>Прикрепите фото</div>
                        <Form.Control
                            required
                            accept=".jpg,.png"
                            onChange={e => setFile(e.target.files[0])}
                            type="file"
                        />
                    </Form.Group>
                    <div className='d-flex flex-row-reverse' >
                        <Button type='submit' style={{ background: '#3aaa35' }}>Отправить </Button>
                    </div>
                </Form>
            </div>
        </div >
    )
}

export default AddDump